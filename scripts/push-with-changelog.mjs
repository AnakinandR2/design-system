/**
 * 推送前写入变更记录并提交、推送。
 * 用法（在 03-前端实现 目录）：
 *   npm run push:gh -- "fix: 说明文案"
 * 未传参时使用默认说明，并附带本次改动的文件列表（来自 git diff）。
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const logRel = path.join('变更记录', 'CHANGELOG.md')
const logPath = path.join(root, logRel)

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getChangedFiles() {
  const q = '-c core.quotepath=false'
  const opts = { cwd: root, encoding: 'utf8' }
  try {
    let staged = execSync(`git ${q} diff --cached --name-only --diff-filter=ACMRT`, opts).trim()
    let vsHead = execSync(`git ${q} diff --name-only HEAD --diff-filter=ACMRT`, opts).trim()
    let untracked = execSync(`git ${q} ls-files --others --exclude-standard`, opts).trim()
    const set = new Set(
      [...staged.split(/\r?\n/), ...vsHead.split(/\r?\n/), ...untracked.split(/\r?\n/)].filter(Boolean)
    )
    return [...set]
  } catch {
    return []
  }
}

function appendAutoReleaseNote(summaryLine, files) {
  const body = fs.readFileSync(logPath, 'utf8')
  const today = todayISO()
  const fileHint = files.length
    ? `涉及：${files.slice(0, 14).join('、')}${files.length > 14 ? '…' : ''}`
    : ''
  const bulletBlock = (fileHint ? `- ${summaryLine}\n- ${fileHint}` : `- ${summaryLine}`) + '\n'

  const anchor = '\n---\n\n'
  const ai = body.indexOf(anchor)
  if (ai === -1) throw new Error('CHANGELOG.md：未找到 --- 分隔，请保持文件头结构')

  const after = ai + anchor.length
  const rest = body.slice(after)

  if (rest.startsWith(`## ${today}`)) {
    const sepIdx = rest.indexOf('\n---\n\n## ')
    if (sepIdx === -1) {
      const newBody = body + `\n${bulletBlock}\n`
      fs.writeFileSync(logPath, newBody, 'utf8')
      return
    }
    const newRest = `${rest.slice(0, sepIdx)}\n${bulletBlock}${rest.slice(sepIdx)}`
    fs.writeFileSync(logPath, body.slice(0, after) + newRest, 'utf8')
    return
  }

  const block = `## ${today}\n\n### 发布（自动）\n\n${bulletBlock}\n---\n\n`
  fs.writeFileSync(logPath, body.slice(0, after) + block + rest, 'utf8')
}

const commitMsg = process.argv.slice(2).join(' ').trim() || 'chore(release): 同步变更记录与发布'
const summaryForLog = commitMsg.replace(/^(fix|feat|docs|chore)(\([^)]+\))?:\s*/i, '').trim() || commitMsg

const files = getChangedFiles()
appendAutoReleaseNote(`Git 发布：${summaryForLog}`, files)
console.log(`[push-with-changelog] 已追加变更记录 → ${logRel}`)

execSync('git add -A', { cwd: root, stdio: 'inherit' })

try {
  execSync(`git commit -m ${JSON.stringify(commitMsg)}`, { cwd: root, stdio: 'inherit' })
} catch {
  console.error('[push-with-changelog] git commit 失败（可能无变更或已提交）。请检查 git status。')
  process.exit(1)
}

execSync('git push origin main', { cwd: root, stdio: 'inherit' })
console.log('[push-with-changelog] 已 push origin main')
