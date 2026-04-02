<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, inject, type Ref } from 'vue'
import type { Lang } from '../../nav'
import DsDocSample from '../../doc/DsDocSample.vue'

const dsLangRef = inject<Ref<Lang> | undefined>('dsLang', undefined)
const lang = computed(() => dsLangRef?.value ?? 'zh')

/** public/delivery/*.zip，与 npm run sync-delivery 产出一致 */
const deliveryPrefix = computed(() => {
  let b = import.meta.env.BASE_URL || '/'
  if (!b.endsWith('/')) b += '/'
  return `${b}delivery/`
})

function triggerDownload(file: string) {
  const url = `${deliveryPrefix.value}${file}`
  const a = document.createElement('a')
  a.href = url
  a.download = file
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const SNIPPET_BUILD = `# 在 03-前端实现 目录执行（推荐：一条命令构建并打 zip）
npm ci
npm run pack:delivery
# → design-system-doc-dist.zip（内含 dist/ 文档站）

npm run pack:delivery:offline
# → design-system-doc-offline.zip（内含 dist-offline/）

npm run pack:delivery:cursor
# → 设计系统-Cursor交付包.zip（Markdown 规范 + el-plus-theme.css + .cursorrules，对齐参考站形态）

# 若只需构建、自行压缩目录：npm run build / build:offline 后手动 zip

# 源码交付：打包整个 03-前端实现，排除 node_modules、dist*
# 解压后：npm i && npm run dev

# 文档站「下载」直链：打包后执行
npm run sync-delivery
# → 将 zip 复制到 public/delivery/（doc-dist.zip 等），再 build / 部署`

function scrollToBuild() {
  document.getElementById('ds-delivery-build')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function copyBuildSnippet() {
  try {
    await navigator.clipboard.writeText(SNIPPET_BUILD)
    ElMessage.success(lang.value === 'zh' ? '已复制打包命令' : 'Copied')
  } catch {
    ElMessage.error(lang.value === 'zh' ? '复制失败' : 'Copy failed')
  }
}
</script>

<template>
  <div class="ds-ep ds-doc-page ds-delivery-page">
    <template v-if="lang === 'zh'">
      <p class="ds-ep__lead">
        说明如何<strong>获取、打包与使用</strong>本设计系统交付物。本站基于
        <strong>Element Plus</strong>
        与文档壳层样式，研发在业务项目中应直接依赖 Element Plus，并参考「快速上手」「颜色」「设计变量」做主题对齐。
      </p>

      <h2 class="ds-delivery-title">交付包内含</h2>
      <el-card shadow="never" class="ds-delivery-card">
        <div class="ds-delivery-package-head" aria-hidden="true">📦</div>
        <p class="ds-delivery-package-name">Element Plus 设计系统交付说明（本仓库）</p>
        <ul class="ds-delivery-list">
          <li>
            <strong>文档站源码</strong>：Vue 3 + Vite + TypeScript（目录
            <code>03-前端实现/</code>
            ）
          </li>
          <li>
            <strong>全局与演示样式</strong>：
            <code>src/assets/design-system.css</code>
            等（文档壳层、演示区覆盖，如天水碧、Alert 等文档约定）
          </li>
          <li>
            <strong>主题与色板</strong>：Figma 色板数据（
            <code>figma-overseas-colors.ts</code>
            ）、Element Plus 设计 token 注入（
            <code>inject-element-plus-design-theme.ts</code>
            、
            <code>element-el-to-design-spec.ts</code>
            ）
          </li>
          <li>
            <strong>组件文档</strong>：与侧栏「组件」分组一致的演示页、示例代码与文末 API 表（对照
            <el-link href="https://element-plus.org/zh-CN/component/overview" target="_blank" rel="noopener noreferrer" type="primary">Element Plus 官方</el-link>
            ）
          </li>
          <li>
            <strong>三种 zip 产出</strong>：
            <code>pack:delivery</code>
            文档站静态包 ·
            <code>pack:delivery:offline</code>
            离线单页包 ·
            <code>pack:delivery:cursor</code>
            <strong>Cursor 规范包</strong>（
            <code>el-plus-theme.css</code>
            、
            <code>colors.md</code>
            、
            <code>components/*.md</code>
            、
            <code>.cursorrules</code>
            等，形态接近参考网站交付包）
          </li>
        </ul>
      </el-card>

      <h2 class="ds-delivery-title">下载交付包</h2>
      <el-card shadow="never" class="ds-delivery-card">
        <p class="ds-delivery-p">
          点击下方按钮将直接下载已部署到
          <code>public/delivery/</code>
          的 zip（维护者需先打包并执行
          <code>npm run sync-delivery</code>
          ，再构建或部署文档站）。
        </p>
        <div class="ds-delivery-dl-row">
          <el-button type="primary" size="large" @click="triggerDownload('doc-dist.zip')">下载交付包</el-button>
          <el-button size="large" @click="triggerDownload('doc-offline.zip')">下载离线包</el-button>
          <el-button size="large" @click="triggerDownload('cursor-delivery.zip')">下载 Cursor 规范包</el-button>
        </div>
        <p class="ds-delivery-p ds-delivery-p--hint">
          若下载失败或得到非 zip 文件，说明服务器上缺少对应文件：请在项目根依次执行
          <code>npm run pack:delivery</code>
          （及需要的 offline/cursor 脚本）、
          <code>npm run sync-delivery</code>
          ，然后重新
          <code>npm run build</code>
          并部署。
        </p>
        <el-divider />
        <p class="ds-delivery-p">
          <strong>维护者本地产出：</strong>在
          <code>03-前端实现</code>
          根目录
          <code>npm ci</code>
          后运行
          <code>npm run pack:delivery</code>
          /
          <code>pack:delivery:offline</code>
          /
          <code>pack:delivery:cursor</code>
          ，生成根目录 zip；再
          <code>npm run sync-delivery</code>
          复制到
          <code>public/delivery/</code>
          。也可在 CI 中生成 zip 后写入制品库，由运维替换
          <code>public/delivery/</code>
          下文件。
        </p>
        <el-space wrap>
          <el-button type="primary" plain @click="scrollToBuild">查看打包命令</el-button>
          <el-button @click="copyBuildSnippet">复制打包命令</el-button>
        </el-space>
      </el-card>

      <h2 class="ds-delivery-title">使用步骤</h2>
      <ol class="ds-delivery-steps">
        <li>
          <span class="ds-delivery-steps__num">1</span>
          <div>
            <strong>解压</strong>
            <p>将收到的 zip 解压到本地任意路径（例如仅含 <code>dist</code>，或完整 <code>03-前端实现</code> 源码）。</p>
          </div>
        </li>
        <li>
          <span class="ds-delivery-steps__num">2</span>
          <div>
            <strong>只读浏览文档</strong>
            <p>
              若只有 <code>dist</code>：用静态服务器托管该目录（如
              <code>npx serve dist</code>
              ），或使用 <code>dist-offline</code> 按你们内网静态站点规范部署。避免依赖
              <code>file://</code>
              直接打开导致资源路径异常。
            </p>
          </div>
        </li>
        <li>
          <span class="ds-delivery-steps__num">3</span>
          <div>
            <strong>用 Cursor / VS Code 打开文件夹（改文档或对齐主题）</strong>
            <p>
              打开解压后的<strong>整个项目根目录</strong>（如
              <code>03-前端实现</code>
              ），不要只打开单个文件。安装 Node.js LTS 后执行
              <code>npm i</code>
              、
              <code>npm run dev</code>
              。需要 AI 辅助时，可在对话中说明「按本设计系统规范」并引用侧栏各页。
            </p>
          </div>
        </li>
        <li>
          <span class="ds-delivery-steps__num">4</span>
          <div>
            <strong>业务项目接入</strong>
            <p>
              在业务工程中安装
              <code>element-plus</code>
              ，将本仓库中的主题变量与色板约定迁入业务（详见「快速上手」）。实现界面时以 Element Plus 组件为主，样式与交互对照本站组件文档与官方 API。
            </p>
          </div>
        </li>
      </ol>

      <h2 id="ds-delivery-build" class="ds-delivery-title">生成交付包（维护者）</h2>
      <DsDocSample
        title-zh="命令行打包"
        title-en="Build commands"
        intro-zh="在项目根目录（03-前端实现）执行；分发前确认版本与变更说明。"
        intro-en="Run from project root before sharing artifacts."
        hide-preview
        code-always-visible
        :code="SNIPPET_BUILD"
      />
    </template>

    <template v-else>
      <p class="ds-ep__lead">
        How to obtain, build, and use deliverables for this Element Plus–based design system doc site.
      </p>
      <h2 class="ds-delivery-title">Package contents</h2>
      <el-card shadow="never" class="ds-delivery-card">
        <ul class="ds-delivery-list">
          <li>Vue 3 + Vite source under <code>03-前端实现/</code></li>
          <li><code>design-system.css</code>, Figma tokens, EP theme injection</li>
          <li>Component demo pages and three zip outputs (docs / offline / Cursor bundle)</li>
        </ul>
      </el-card>
      <h2 class="ds-delivery-title">Download</h2>
      <el-card shadow="never" class="ds-delivery-card">
        <p class="ds-delivery-p">
          Use the button below to download zips from
          <code>public/delivery/</code>
          (run
          <code>npm run sync-delivery</code>
          after packing, then build/deploy).
        </p>
        <div class="ds-delivery-dl-row">
          <el-button type="primary" size="large" @click="triggerDownload('doc-dist.zip')">Download package</el-button>
          <el-button size="large" @click="triggerDownload('doc-offline.zip')">Offline bundle</el-button>
          <el-button size="large" @click="triggerDownload('cursor-delivery.zip')">Cursor spec bundle</el-button>
        </div>
        <p class="ds-delivery-p ds-delivery-p--hint">
          If the download fails, run pack scripts and
          <code>npm run sync-delivery</code>
          , then rebuild.
        </p>
        <el-divider />
        <p class="ds-delivery-p">
          <strong>Maintainers:</strong>
          <code>npm run pack:delivery</code>
          /
          <code>pack:delivery:offline</code>
          /
          <code>pack:delivery:cursor</code>
          , then
          <code>npm run sync-delivery</code>
          .
        </p>
        <el-space wrap>
          <el-button type="primary" plain @click="scrollToBuild">Build commands</el-button>
          <el-button @click="copyBuildSnippet">Copy commands</el-button>
        </el-space>
      </el-card>
      <h2 class="ds-delivery-title">Steps</h2>
      <ol class="ds-delivery-steps">
        <li>
          <span class="ds-delivery-steps__num">1</span>
          <div>
            <strong>Unzip</strong>
            <p>Extract the zip to a local folder.</p>
          </div>
        </li>
        <li>
          <span class="ds-delivery-steps__num">2</span>
          <div>
            <strong>Read-only docs</strong>
            <p>Serve <code>dist</code> or deploy <code>dist-offline</code> with a static host; avoid <code>file://</code> if assets break.</p>
          </div>
        </li>
        <li>
          <span class="ds-delivery-steps__num">3</span>
          <div>
            <strong>Edit in Cursor / VS Code</strong>
            <p>Open the whole project folder, <code>npm i</code>, <code>npm run dev</code>.</p>
          </div>
        </li>
        <li>
          <span class="ds-delivery-steps__num">4</span>
          <div>
            <strong>App integration</strong>
            <p>Use Element Plus in the product app; align tokens per Quick start / Colors / Design tokens.</p>
          </div>
        </li>
      </ol>
      <h2 id="ds-delivery-build" class="ds-delivery-title">Build (maintainers)</h2>
      <DsDocSample
        title-zh="命令行打包"
        title-en="Build commands"
        hide-preview
        code-always-visible
        :code="SNIPPET_BUILD"
      />
    </template>
  </div>
</template>
