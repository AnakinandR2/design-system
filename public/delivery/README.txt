此目录下的 zip 由维护者生成，用于文档站「交付包下载」页直链下载。

1. 在项目根（03-前端实现）执行打包：
   npm run pack:delivery
   npm run pack:delivery:offline
   npm run pack:delivery:cursor

2. 再执行同步（复制到本目录并统一文件名）：
   npm run sync-delivery

文件名：
- doc-dist.zip        ← design-system-doc-dist.zip
- doc-offline.zip     ← design-system-doc-offline.zip
- cursor-delivery.zip ← 设计系统-Cursor交付包.zip

部署文档站前请确保已执行上述步骤，否则下载会得到 404。
