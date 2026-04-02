/**
 * 将根目录已打好的 zip 复制到 public/delivery/，供文档站「下载交付包」直链使用。
 * 请先执行：npm run pack:delivery / pack:delivery:offline / pack:delivery:cursor
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const destDir = join(root, 'public', 'delivery')
const map = [
  ['design-system-doc-dist.zip', 'doc-dist.zip'],
  ['design-system-doc-offline.zip', 'doc-offline.zip'],
  ['设计系统-Cursor交付包.zip', 'cursor-delivery.zip'],
]

mkdirSync(destDir, { recursive: true })
let n = 0
for (const [srcName, destName] of map) {
  const src = join(root, srcName)
  const dest = join(destDir, destName)
  if (existsSync(src)) {
    copyFileSync(src, dest)
    console.log(`[sync-delivery] ${srcName} → public/delivery/${destName}`)
    n++
  } else {
    console.warn(`[sync-delivery] 跳过（不存在）: ${srcName}`)
  }
}
console.log(`[sync-delivery] 完成，已复制 ${n} 个文件。`)
