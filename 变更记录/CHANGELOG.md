# 设计系统站点 — 变更记录

> 仓库：`design-system`（GitHub Pages）  
> 说明：按日期倒序排列；同日条目为功能分组，便于对照发布与回滚。

---

## 2026-04-10

### 品牌与顶栏文案

- 顶栏 Logo 替换为香蕉图形（资源：`public/banana-logo.svg`），通过组件 `src/components/DsBrandMark.vue` 引用，支持 `base` 子路径部署。
- 移除顶栏「design system」文字；`src/design-system/nav.ts` 删除中英 `brand` 字段。
- 品牌链接 `aria-label` 统一为「首页」；新增全局样式 `.ds-brand--mark-only`（仅图标时的间距与点击区域）。

### 顶栏交互（浅色主题）

- 文档站 `.ds-topnav`、视觉样例 `.ds-dash__header` 内 **ghost 按钮悬停** 背景改为 **纯白 `#ffffff`**，不再使用灰色 `var(--ds-nav-hover-bg)`；暗色主题与侧栏 ghost 行为不变。

### 文档与说明

- 新增本目录与本文件，用于集中记录版本级变更。

### 修复：首页顶栏按钮悬停无动效（同日补充）

- **现象**：仅在首页（`WelcomeView`）时，顶栏 ghost 按钮（文档入口、语言、主题等）鼠标悬停几乎无颜色/背景反馈。
- **根因**：CSS 中「悬停在子元素上时，祖先 `header` 也会匹配 `:hover`」。因此只要指针移到按钮上，`.ds-welcome__top.ds-topnav:not(:hover) …` 整段不再生效，而 `.ds-welcome__top.ds-topnav:hover a.ds-btn…` **未带子元素自身的 `:hover`**，会把「当前正悬停的那颗按钮」也设成 `background: transparent`；该规则经 Vue `scoped` 后优先级高于全局 `.ds-btn--ghost:hover`，结果盖掉了本应出现的悬停样式。
- **修复**：在「顶栏已处于 `:hover`」的前提下，为 `a.ds-topnav-entry:hover`、语言 `button:hover`、`.iconbtn:hover` 单独写明颜色/边框/背景（亮色白底、暗色 `var(--ds-nav-hover-bg)`），与文档站顶栏体验一致。

### 首页背景动效

- `WelcomeView` 弥散色块（`welcome-blob-*` / `welcome-blob-f*` 关键帧）**位移与缩放呼吸幅度**略增，前景层同步略加大透明度起伏，便于在 scrim 之上感知动效。

### 发布流程

- 新增 `scripts/push-with-changelog.mjs`，命令 **`npm run push:gh -- "提交说明"`**（说明可省略则使用默认文案）：在推送前自动向本文件 **当日** 小节追加一条发布记录，并执行 `git add` → `commit` → `push`。以后向 GitHub 发布请优先使用该命令，无需再手动维护本节日期标题下的每一条 bullet（仍可在自动记录后手动润色根因说明）。

- Git 发布：首页顶栏悬停动效、push:gh 与变更记录维护
- 涉及：package.json、src/views/WelcomeView.vue、变更记录/CHANGELOG.md、scripts/push-with-changelog.mjs

- Git 发布：push-with-changelog 中文路径与未跟踪文件
- 涉及：scripts/push-with-changelog.mjs、变更记录/CHANGELOG.md

- Git 发布：style: 首页弥散色块呼吸幅度加大
- 涉及：src/views/WelcomeView.vue、变更记录/CHANGELOG.md

---

## 2026-04-09

### 文档站路由与顶栏

- `DesignSystemView`：监听 `route.path` 同步 `activeNavId`，解决 Hash 路由下顶栏 `router-link` 跳转不触发 `hashchange` 导致侧栏/内容不同步；切换文档时主内容区 `.ds-main` 滚动回顶。
- 全局顶栏四个入口（快速上手、组件实例、视觉样例、资源下载）与 `a.ds-btn.ds-topnav-entry` 样式。

### 视觉样例顶栏布局

- 顶栏左侧：品牌 + 面包屑；右侧：四个全局入口 + 与文档站一致的 `.ds-search` + 语言/主题等，减少与文档站切换时的顶栏跳动。
- 顶栏与文档站对齐：高度 56px、左右内边距 `0 24px 0 20px`、品牌图标 28px。

---

## 2026-04-01

### 首页（欢迎页）

- 新增全屏 `WelcomeView`：背景图、弥散色块动效、双行主标题与副文案、三个 CTA（开始使用 / 视觉样例 / 资源下载）。
- 主内容垂直/水平居中；顶栏默认透明、悬停实底（亮/暗主题分别处理）；透明态下强化右侧操作区对比度（后于 04-10 去掉品牌字阴影）。
- 弥散光斑位置与动画幅度向画面中部收敛。

### 路由与构建

- 路由：`/` 欢迎页、`/showcase` 展示页、`/:pathMatch(.*)*` 文档站；Vite `dev` 使用 `base: '/'`，`build` 使用 `/design-system/` 以适配 GitHub Pages。

### 文档与展示

- `nav.ts` 欢迎页与顶栏相关文案键；快速上手、视觉样例（Dashboard 布局）等页面迭代（详见该日提交 `0ca8b72` 文件列表）。

### 设计 Token（暗色主题）

- `:root[data-theme="dark"]` 补充 `--ds-radius-s`、`--ds-radius-m`、`--ds-font`，修复暗色模式下 `var(--ds-radius-m)` 无效导致顶栏等控件圆角消失的问题。

---

## 历史提交索引（Git）

| 日期（约） | Commit     | 摘要 |
| ---------- | ---------- | ---- |
| 2026-04-09 | `085cab5`  | 顶栏导航与路由同步、展示页顶栏布局与抖动修复 |
| 2026-04-01 | `0ca8b72`  | 欢迎页、展示与快速上手、构建配置 |
| 更早       | `62232ff`  | 初始站点与 GitHub Pages 配置 |

---

## 维护说明

- **向 GitHub 发布**：在项目根目录执行 **`npm run push:gh -- "提交说明"`**（脚本会先向本文件当日小节追加发布记录，再 `git add` / `commit` / `push`）。说明可省略则使用默认文案。
- 若需单独手写根因或润色，可在自动追加后编辑当日小节，再执行一次 `push:gh` 或手动 `git commit`。
- 线上地址（配置为 GitHub Actions 部署时）：`https://anakinandr2.github.io/design-system/`
