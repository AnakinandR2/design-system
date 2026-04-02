/**
 * 生成「Cursor / 研发规范交付包」：主题 CSS、Markdown 规范、.cursorrules、README。
 * 运行：npx tsx scripts/build-cursor-delivery.ts
 */
import { createWriteStream, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import archiver from 'archiver'
import { FIGMA_OVERSEAS_COLOR_GROUPS } from '../src/design-system/color-tokens/figma-overseas-colors'
import { NAV_SECTIONS, type NavLeaf } from '../src/design-system/nav'
import { EL_COLOR_DESIGN_SPEC } from '../src/design-system/tokens/element-el-to-design-spec'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const STAGING = join(PROJECT_ROOT, '.cursor-delivery-staging')
const ZIP_NAME = '设计系统-Cursor交付包.zip'

const EL_SEMANTIC_RGB_VARS = [
  '--el-color-primary',
  '--el-color-success',
  '--el-color-warning',
  '--el-color-danger',
  '--el-color-error',
  '--el-color-info',
] as const

function hexToRgbComma(hex: string): string {
  const raw = hex.trim().replace(/^#/, '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `${r}, ${g}, ${b}`
}

function buildElPlusThemeCss(): string {
  const lines: string[] = [
    '/* 由 scripts/build-cursor-delivery.ts 从 element-el-to-design-spec 生成，勿手改 */',
    '/* 在 element-plus/dist/index.css 之后引入本文件 */',
    ':root {',
  ]
  for (const [name, spec] of Object.entries(EL_COLOR_DESIGN_SPEC)) {
    lines.push(`  ${name}: ${spec.hex};`)
  }
  for (const name of EL_SEMANTIC_RGB_VARS) {
    const hex = EL_COLOR_DESIGN_SPEC[name]?.hex
    if (hex) lines.push(`  ${name}-rgb: ${hexToRgbComma(hex)};`)
  }
  lines.push('}')
  return `${lines.join('\n')}\n`
}

function buildColorsMd(): string {
  const parts: string[] = [
    '# 色彩',
    '',
    '色值来自 Figma「海外综合站设计规范汇总」生成色彩规范；业务侧请通过 **CSS 变量** 引用，避免硬编码 HEX。',
    '',
  ]
  for (const g of FIGMA_OVERSEAS_COLOR_GROUPS) {
    parts.push(`## ${g.titleZh}（${g.titleEn}）`, '')
    if (g.intro) parts.push(g.intro, '')
    parts.push('| 名称 | HEX | 建议变量 |', '| --- | --- | --- |')
    for (const t of g.tokens) {
      const v = t.cssVar ? `\`${t.cssVar}\`` : '—'
      parts.push(`| ${t.name} | \`${t.hex}\` | ${v} |`)
    }
    parts.push('')
  }
  return parts.join('\n')
}

/** Element Plus 文档路径 slug（与本站 nav id 不一致时在此映射） */
const EP_DOC_SLUG: Record<string, string> = {
  modal: 'dialog',
  spin: 'loading',
  navigation: 'menu',
}

function epDocUrl(navId: string): string {
  const slug = EP_DOC_SLUG[navId] ?? navId
  return `https://element-plus.org/zh-CN/component/${slug}`
}

function collectComponentLeaves(): NavLeaf[] {
  const sec = NAV_SECTIONS.find((s) => s.id === 'components')
  if (!sec || sec.kind !== 'grouped') return []
  return sec.subgroups.flatMap((sub) => sub.children)
}

function buildComponentMd(leaf: NavLeaf): string {
  const { id, labels } = leaf
  return `# ${labels.zh}（${labels.en}）

本条目对齐 **Element Plus** 官方组件，主色等已由 \`el-plus-theme.css\` 注入（天水碧等品牌色）。

## 官方文档

- [Element Plus — ${labels.en}](${epDocUrl(id)})

## 实现说明

- 使用原生 \`el-*\` 组件，勿引入其他 UI 库。
- 更完整的演示、组件用法/样式/状态与文末 API 表，见本设计系统**在线或离线文档站**对应侧栏页面（nav id: \`${id}\`）。

## 最小示例

\`\`\`vue
<!-- 请根据官方文档补充 props / 插槽 -->
\`\`\`
`
}

const README_PM = `# 设计系统 Cursor 交付包 — 使用说明

> 给**产品经理 / 交互**：用 Cursor 打开本文件夹后，AI 可读 \`.cursorrules\` 与 Markdown 规范，生成页面时遵循 **Element Plus + 团队色板**。

---

## 第一步：用 Cursor 打开整个文件夹

**File → Open Folder**，选择解压后的文件夹根目录，不要只打开单个文件。

---

## 第二步：初始化前端项目（首次）

若当前目录还没有 \`package.json\`，在 Cursor 里说明：

> **请按 README-dev.md 帮我新建 Vue3 + Vite 项目并接入 Element Plus 与本包里的 el-plus-theme.css**

或自行让 AI：**创建 Vue 3 + Vite 项目、安装 element-plus 与 @element-plus/icons-vue、在 main 里于 EP 样式之后引入 \`./el-plus-theme.css\`**。

---

## 第三步：描述页面需求

直接描述页面结构即可；AI 应只使用 **Element Plus** 组件，颜色使用 \`el-plus-theme.css\` 中的变量。

---

## 本包与参考站「设计规范交付包」的差异

| 参考包（示例站） | 本包（当前设计系统） |
| --- | --- |
| 含 AppSidebar / Topbar 等 **4 个封装布局组件** | **无**封装业务布局组件，请用 \`el-container\` / \`el-menu\` / \`el-header\` 等自行搭建 |
| 独立 \`components/*.md\` + VitePress 演示 | **Markdown 规范** + 链接到 EP 官方文档；完整交互演示在 **文档站**（可另发 dist zip） |

详细开发接入见 **README-dev.md**。
`

const README_DEV = `# 设计系统 Cursor 交付包 — 开发接入

> 面向**前端**：将团队主题与规范接入 Vue 3 业务项目。

## 文件说明

| 文件 | 说明 |
| --- | --- |
| \`el-plus-theme.css\` | **必须**：在 \`element-plus/dist/index.css\` **之后**引入，覆盖 \`--el-*\` 颜色（天水碧等） |
| \`colors.md\` 等 | 基础规范只读参考 |
| \`components/*.md\` | 各组件与 EP 文档的对应关系摘要 |
| \`instances/README.md\` | 说明本包**不含**封装布局组件时的替代做法 |
| \`.cursorrules\` | Cursor AI 规则（产品用 Cursor 生成原型时生效） |

## 最小接入（main.ts）

\`\`\`ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './el-plus-theme.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
\`\`\`

## 与文档站的关系

- **本 zip**：规范文本 + 主题 CSS，适合放进业务仓库或给 Cursor 当上下文。
- **设计系统文档站**（\`npm run pack:delivery\` 打出的 dist）：带侧栏的可点击演示与 API 表，建议一并交付研发。

## 更新主题

重新向设计要包或从设计系统仓库执行 \`npm run pack:delivery:cursor\` 生成新版 zip。
`

const CURSORRULES = `# 设计系统 — Cursor AI 规则（Element Plus · 天水碧）
# 打开本文件夹后，生成界面时请默认遵守以下约定。

## 技术栈

- Vue 3 + \`<script setup lang="ts">\`
- UI：**仅允许 Element Plus**，图标使用 \`@element-plus/icons-vue\`
- 禁止 Ant Design、Vant、naive-ui 等；禁止用裸 div 模拟 EP 已有组件

## 样式与颜色

- 在业务项目中必须在 EP 全局样式**之后**引入本包 \`el-plus-theme.css\`
- 颜色优先使用 Element 变量（如 \`var(--el-color-primary)\`、\`var(--el-text-color-primary)\`），**禁止**随意硬编码 #RRGGBB（除 EP 不覆盖的极个别场景需在注释中说明）

## 布局组件

- 本交付包**不包含** AppSidebar / AppTopbar 等封装组件
- 后台布局请使用 \`el-container\`、\`el-aside\`、\`el-header\`、\`el-main\` + \`el-menu\` / \`el-breadcrumb\` 等组合实现

## 文档对照

- 组件 API 以 [Element Plus 官方](https://element-plus.org/zh-CN/component/overview) 为准
- 视觉与色板细节对照本包 \`colors.md\` 与 \`components/*.md\` 中的链接

## 初始化空目录

若当前没有 package.json，请先创建 Vue 3 + Vite 项目并安装 element-plus、@element-plus/icons-vue，再复制 \`el-plus-theme.css\` 到 src 并按上文引入。
`

const TYPOGRAPHY_MD = `# 字体与排版

- 中文界面优先使用系统字体栈：\`-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif\`（与 Element Plus 文档站习惯一致）。
- 字号、行高优先遵循 **Element Plus** 默认组件样式；不要大规模覆盖 \`font-size\` 除非设计稿明确要求。
- 标题层级用 \`el-page-header\`、页面内标题用语义化标题或 EP 文档推荐结构。
`

const SPACING_MD = `# 间距

- 表单、按钮组等优先使用 Element Plus 默认间距（如 \`el-form\`、\`el-space\`、\`el-row\` gutter）。
- 可与设计稿 8px 栅格对齐：优先 8 / 12 / 16 / 24 等倍数。
`

const BORDER_MD = `# 边框与圆角

- 默认圆角、边框色以 Element Plus 为准，并由 \`el-plus-theme.css\` 中的 \`--el-border-*\` 等与 Figma 中性色对齐。
- 文档站中个别组件（如 Alert 示例）另有 8px 圆角等展示约定，业务若需一致可在全局样式中按组件覆盖并注释依据。
`

const INSTANCES_README = `# 布局与实例说明

参考网站交付包中的 **AppSidebar、AppTopbar、AppFilter、AppStatCard** 等封装组件，**本设计系统交付包不包含**这些 .vue 文件。

## 推荐做法

- **侧栏**：\`el-menu\` + \`el-aside\`，折叠用 \`collapse\` 与宽度变量控制。
- **顶栏**：\`el-header\` + \`el-breadcrumb\` + \`el-dropdown\`（用户菜单）。
- **筛选区**：\`el-form\` inline + \`el-row\` / \`el-col\` 排布表单项。
- **统计卡片**：\`el-card\` 或 \`el-row\` 下多块卡片，配图放 \`public/images/\`。

## 图片占位

可在业务项目 \`public/images/logo/\` 下放置 Logo；本包仅提供目录说明文件。
`

async function main() {
  if (existsSync(STAGING)) rmSync(STAGING, { recursive: true })
  mkdirSync(join(STAGING, 'components'), { recursive: true })
  mkdirSync(join(STAGING, 'instances'), { recursive: true })
  mkdirSync(join(STAGING, 'public/images/logo'), { recursive: true })

  writeFileSync(join(STAGING, 'el-plus-theme.css'), buildElPlusThemeCss(), 'utf8')
  writeFileSync(join(STAGING, 'colors.md'), buildColorsMd(), 'utf8')
  writeFileSync(join(STAGING, 'typography.md'), TYPOGRAPHY_MD, 'utf8')
  writeFileSync(join(STAGING, 'spacing.md'), SPACING_MD, 'utf8')
  writeFileSync(join(STAGING, 'border.md'), BORDER_MD, 'utf8')
  writeFileSync(join(STAGING, 'README.md'), README_PM, 'utf8')
  writeFileSync(join(STAGING, 'README-dev.md'), README_DEV, 'utf8')
  writeFileSync(join(STAGING, '.cursorrules'), CURSORRULES, 'utf8')
  writeFileSync(join(STAGING, 'instances/README.md'), INSTANCES_README, 'utf8')
  writeFileSync(
    join(STAGING, 'public/images/logo/README.txt'),
    '将 logo-full.png（侧栏展开）、logo-icon.png（侧栏折叠）放在此目录，或按业务自行命名并在代码中引用。\n',
    'utf8',
  )

  for (const leaf of collectComponentLeaves()) {
    const name = `${leaf.id}.md`
    writeFileSync(join(STAGING, 'components', name), buildComponentMd(leaf), 'utf8')
  }

  const outZip = join(PROJECT_ROOT, ZIP_NAME)
  const output = createWriteStream(outZip)
  const archive = archiver('zip', { zlib: { level: 9 } })
  archive.on('error', (err) => {
    throw err
  })
  const closed = new Promise<void>((resolve, reject) => {
    output.on('close', () => resolve())
    output.on('error', reject)
  })
  archive.pipe(output)
  const innerRoot = '设计系统-Cursor交付包'
  archive.directory(STAGING, innerRoot)
  await archive.finalize()
  await closed

  rmSync(STAGING, { recursive: true })

  const kb = (archive.pointer() / 1024).toFixed(1)
  console.log(`[build-cursor-delivery] 已生成 ${ZIP_NAME}（${kb} KB）`)
  console.log(`[build-cursor-delivery] 路径: ${outZip}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
