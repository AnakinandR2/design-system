/**
 * 推送前写入变更记录并提交、推送。
 * 用法（在 03-前端实现 目录）：
 *   npm run push:gh -- "fix: 说明文案"
 * 未传参时使用默认说明，并附带本次改动的文件列表（来自 git diff）。
 *
 * 变更记录写入两处（内容相同）：
 *   - 变更记录/CHANGELOG.md（约定目录）
 *   - changelog/CHANGELOG.md（纯英文路径，避免资源管理器中文文件夹乱码找不到）
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const logPathPrimary = path.join(root, '变更记录', 'CHANGELOG.md')
const logPathMirror = path.join(root, 'changelog', 'CHANGELOG.md')
const logRels = ['变更记录/CHANGELOG.md', 'changelog/CHANGELOG.md']

function readChangelogUtf8() {
  for (const p of [logPathPrimary, logPathMirror]) {
    try {
      return fs.readFileSync(p, 'utf8')
    } catch {
      /* try next */
    }
  }
  throw new Error('找不到 CHANGELOG.md：请至少保留 变更记录/ 或 changelog/ 下的一份')
}

function writeChangelogUtf8(fullBody) {
  for (const p of [logPathPrimary, logPathMirror]) {
    fs.mkdirSync(path.dirname(p), { recursive: true })
    fs.writeFileSync(p, fullBody, 'utf8')
  }
}

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

function appendAutoReleaseNote(commitMessage, summaryForLog, files) {
  const body = readChangelogUtf8()
  const today = todayISO()
  const fileHint = files.length
    ? `涉及：${files.slice(0, 14).join('、')}${files.length > 14 ? '…' : ''}`
    : ''
  const summaryLine = `Git 发布：${summaryForLog}`
  const releaseBlock =
    `### push:gh — ${commitMessage.replace(/\r?\n/g, ' ')}\n\n` +
    `- ${summaryLine}\n` +
    (fileHint ? `- ${fileHint}\n` : '') +
    `\n`

  const anchor = '\n---\n\n'
  const ai = body.indexOf(anchor)
  if (ai === -1) throw new Error('CHANGELOG.md：未找到 --- 分隔，请保持文件头结构')

  const after = ai + anchor.length
  const rest = body.slice(after)

  const dayHeader = `## ${today}`
  let newBody
  if (rest.startsWith(dayHeader)) {
    let pos = dayHeader.length
    while (pos < rest.length && rest[pos] === '\n') pos++
    const newRest = rest.slice(0, pos) + releaseBlock + rest.slice(pos)
    newBody = body.slice(0, after) + newRest
  } else {
    const block = `## ${today}\n\n${releaseBlock}---\n\n`
    newBody = body.slice(0, after) + block + rest
  }

  writeChangelogUtf8(newBody)
}

const commitMsg = process.argv.slice(2).join(' ').trim() || 'chore(release): 同步变更记录与发布'
const summaryForLog = commitMsg.replace(/^(fix|feat|docs|chore)(\([^)]+\))?:\s*/i, '').trim() || commitMsg

const files = getChangedFiles()
appendAutoReleaseNote(commitMsg, summaryForLog, files)
console.log(`[push-with-changelog] 已追加变更记录 → ${logRels.join(' 与 ')}`)

execSync('git add -A', { cwd: root, stdio: 'inherit' })

try {
  execSync(`git commit -m ${JSON.stringify(commitMsg)}`, { cwd: root, stdio: 'inherit' })
} catch {
  console.error('[push-with-changelog] git commit 失败（可能无变更或已提交）。请检查 git status。')
  process.exit(1)
}

execSync('git push origin main', { cwd: root, stdio: 'inherit' })
console.log('[push-with-changelog] 已 push origin main')
