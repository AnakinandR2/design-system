# 设计系统站点 — 变更记录

> 仓库：`design-system`（GitHub Pages）  
> 说明：**按日期倒序**；同一日内按主题或单次推送分小节。若资源管理器里本文件夹名显示异常，请打开同级的 **`changelog/CHANGELOG.md`**（与本文内容同步）。

---

## 2026-04-10

### push:gh — docs: 变更记录双路径(changelog镜像)与 push 脚本同步写入

- Git 发布：变更记录双路径(changelog镜像)与 push 脚本同步写入
- 涉及：scripts/push-with-changelog.mjs、变更记录/CHANGELOG.md、changelog/CHANGELOG.md、changelog/README.md、变更记录/本文件夹说明.txt

### 暗色按钮（对齐 Arco）与 Secondary 提亮

- `design-system.css`：暗色下 `--ds-btn-secondary-*`，顶栏 / 展示页 ghost、icon、primary 焦点环等与 [Arco Design](https://arco.design/) 暗色 Secondary / Primary 语义对齐；本站背景较浅，Secondary 略提亮。
- `WelcomeView.vue`：首页 CTA 与透明顶栏控件与上述 token 一致。
- 弥散色块：关键帧分段 `animation-timing-function`、去掉全局 `ease-in-out`；另有呼吸幅度调整（见提交 `90e364f`）。

### push:gh — style: 暗色按钮对齐 Arco 并提亮 Secondary、首页透明顶栏

- Git 发布：暗色按钮对齐 Arco 并提亮 Secondary、首页透明顶栏
- 涉及：src/assets/design-system.css、src/views/WelcomeView.vue

### push:gh — feat: Logo 双稿与顶栏对齐、首页反白标与淡阴影

- Git 发布：Logo 双稿与顶栏对齐、首页反白标与淡阴影
- 涉及：src/assets/design-system.css、src/components/DsBrandMark.vue、src/views/DesignShowcaseView.vue、src/views/DesignSystemView.vue、src/views/WelcomeView.vue、变更记录/CHANGELOG.md、public/logo-dark-bg.svg、public/logo-light-bg.svg

### 官方 Logo 双稿与顶栏

- `logo-light-bg.svg` / `logo-dark-bg.svg`，`DsBrandMark.vue` 随主题切换；顶栏 Logo 34px；顶栏 stretch 与品牌区对齐。
- 首页浅色透明顶栏：反白 Logo + 淡阴影；实底悬停恢复彩色稿。

### push:gh — style: 首页弥散色块呼吸幅度加大

- Git 发布：首页弥散色块呼吸幅度加大
- 涉及：src/views/WelcomeView.vue、变更记录/CHANGELOG.md

### push:gh — fix: push-with-changelog 中文路径与未跟踪文件

- Git 发布：push-with-changelog 中文路径与未跟踪文件
- 涉及：scripts/push-with-changelog.mjs、变更记录/CHANGELOG.md

### 首页顶栏悬停动效与发布脚本

- 根因与修复：见此前「子元素悬停导致 `header:hover` / scoped 覆盖 ghost」说明；为链接与按钮单独写 `:hover`。
- `push-with-changelog.mjs`、`npm run push:gh`。

### push:gh — fix: 首页顶栏悬停动效、push:gh 与变更记录维护

- Git 发布：首页顶栏悬停动效、push:gh 与变更记录维护
- 涉及：package.json、src/views/WelcomeView.vue、变更记录/CHANGELOG.md、scripts/push-with-changelog.mjs

### 香蕉 Logo、顶栏文案与浅色顶栏 ghost

- 占位 Logo、去掉顶栏品牌字、`nav.ts` 调整、浅色 ghost 悬停白底等；新增变更记录目录。

### push:gh — feat: 香蕉品牌 Logo、顶栏文案与浅色悬停优化，新增变更记录

- Git 发布：香蕉品牌 Logo、顶栏文案与浅色悬停优化，新增变更记录

---

## 2026-04-07

### 文档站路由与顶栏、展示页顶栏

- `DesignSystemView`：`route.path` 同步侧栏；顶栏入口与搜索区对齐展示页。

### 欢迎页、路由、构建与 Token

- `WelcomeView`、路由与 Vite `base`；暗色 `--ds-radius-*`、`--ds-font` 等。

---

## 2026-04-02

### 初始站点与 GitHub Pages

- 提交 `62232ff`。

---

## 历史提交索引（Git）

| 日期       | Commit     | 摘要 |
| ---------- | ---------- | ---- |
| 2026-04-10 | `a2c39cf`  | 暗色按钮 Arco 化、Secondary 提亮 |
| 2026-04-10 | `e63530c`  | Logo 双稿、顶栏对齐、反白标 |
| 2026-04-10 | `90e364f`  | 弥散呼吸幅度 |
| 2026-04-10 | `1cdcb49`  | push 脚本 quotepath |
| 2026-04-10 | `8817dd2`  | 顶栏悬停、push:gh |
| 2026-04-10 | `e98a159`  | 香蕉 Logo、变更记录初版 |
| 2026-04-07 | `085cab5`  | 路由与展示顶栏 |
| 2026-04-07 | `0ca8b72`  | 欢迎页与构建 |
| 2026-04-02 | `62232ff`  | 初始站点 |

---

## 维护说明

- 发布：`npm run push:gh -- "说明"`（在 `03-前端实现`）。脚本会更新 **`变更记录/CHANGELOG.md`** 与 **`changelog/CHANGELOG.md`**（内容相同）。
- 线上：`https://anakinandR2.github.io/design-system/`
