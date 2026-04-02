/**
 * 将 Vite 构建产物打成 zip，输出在项目根目录。
 * 用法：node scripts/pack-delivery.mjs
 *       node scripts/pack-delivery.mjs --offline   （打包 dist-offline）
 */
import { execSync } from 'node:child_process'
import { createWriteStream, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import archiver from 'archiver'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function main() {
  const offline = process.argv.includes('--offline')
  const folder = offline ? 'dist-offline' : 'dist'
  const zipName = offline ? 'design-system-doc-offline.zip' : 'design-system-doc-dist.zip'

  process.chdir(root)

  if (offline) {
    execSync('npm run build:offline', { stdio: 'inherit' })
  } else {
    execSync('npm run build', { stdio: 'inherit' })
  }

  const srcDir = path.join(root, folder)
  if (!existsSync(srcDir)) {
    console.error(`[pack-delivery] 未找到 ${folder}，请先确认构建成功。`)
    process.exit(1)
  }

  const outPath = path.join(root, zipName)
  const output = createWriteStream(outPath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  archive.on('error', (err) => {
    throw err
  })

  const closed = new Promise((resolve, reject) => {
    output.on('close', resolve)
    output.on('error', reject)
  })

  archive.pipe(output)
  archive.directory(srcDir, folder)
  await archive.finalize()
  await closed

  const kb = (archive.pointer() / 1024).toFixed(1)
  console.log(`[pack-delivery] 已生成 ${zipName}（${kb} KB）`)
  console.log(`[pack-delivery] 路径: ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
