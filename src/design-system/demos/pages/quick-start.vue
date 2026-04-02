<script setup lang="ts">
import DsDocSample from '../../doc/DsDocSample.vue'
import {
  SNIPPET_CONFIG_PROVIDER,
  SNIPPET_MAIN_FULL,
  SNIPPET_MAIN_THIS_REPO,
  SNIPPET_TSCONFIG_TYPES,
  SNIPPET_VITE_ON_DEMAND,
} from './quick-start-snippets'

const SNIPPET_PANEL = `<!-- 侧栏切换各组件演示；地址 #/showcase 打开视觉样例页 -->
<template>
  <el-alert type="info" :closable="false" show-icon>...</el-alert>
  <el-steps :active="3">...</el-steps>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-quick-start">
    <p class="ds-ep__lead">
      本节说明如何在项目中接入 Element Plus，并与本设计系统文档站的关系。更完整的官方说明见
      <el-link
        href="https://element-plus.org/zh-CN/guide/quickstart"
        target="_blank"
        rel="noopener noreferrer"
        type="primary"
      >
        Element Plus 快速开始
      </el-link>
      ；组件 API 以
      <el-link
        href="https://element-plus.org/zh-CN/component/overview"
        target="_blank"
        rel="noopener noreferrer"
        type="primary"
      >
        官方组件总览
      </el-link>
      为准。侧栏仅收录与当前文档对齐的子集。以下各节代码默认全部展示，可通过工具栏复制。
    </p>

    <DsDocSample
      title-zh="本仓库当前用法（完整引入）"
      title-en="This repo (full import)"
      intro-zh="Vite + Vue 3，main.ts 完整注册 Element Plus；另含暗色变量表与文档壳层样式。"
      intro-en="Full Element Plus registration in main.ts."
      hide-preview
      code-always-visible
      :code="SNIPPET_MAIN_THIS_REPO"
    />
    <p class="ds-quick-after-sample">
      <code>design-system.css</code>
      ：侧栏与演示画布壳层；
      <code>theme-chalk/dark/css-vars.css</code>
      配合
      <code>html[data-theme=&quot;dark&quot;]</code>
      。
    </p>

    <DsDocSample
      title-zh="完整引入（官方最小示例）"
      title-en="Official full import"
      hide-preview
      code-always-visible
      :code="SNIPPET_MAIN_FULL"
    />

    <DsDocSample
      title-zh="按需导入（推荐新业务）"
      title-en="On-demand import"
      intro-zh="unplugin-vue-components + unplugin-auto-import + ElementPlusResolver。"
      intro-en="Vite plugins for on-demand components."
      hide-preview
      code-always-visible
      :code="SNIPPET_VITE_ON_DEMAND"
    />
    <p class="ds-quick-after-sample">
      安装：
      <code>npm i -D unplugin-vue-components unplugin-auto-import</code>
    </p>

    <p class="ds-token-section__intro" style="margin-bottom: 20px">
      手动按组件 import 时，需配合
      <code>unplugin-element-plus</code>
      处理样式，见
      <el-link href="https://element-plus.org/zh-CN/guide/quickstart" target="_blank" rel="noopener noreferrer" type="primary">
        官方 · 手动导入
      </el-link>
      。
    </p>

    <DsDocSample
      title-zh="Volar 与 TypeScript"
      title-en="Volar & TS"
      intro-zh="tsconfig 中 types 加入 element-plus/global。"
      intro-en="Add element-plus/global to compilerOptions.types."
      hide-preview
      code-always-visible
      :code="SNIPPET_TSCONFIG_TYPES"
    />

    <DsDocSample
      title-zh="全局配置 size / zIndex"
      title-en="Global config"
      intro-zh="app.use(ElementPlus, { … }) 或 el-config-provider。"
      intro-en="Global options or ConfigProvider."
      hide-preview
      code-always-visible
      :code="SNIPPET_CONFIG_PROVIDER"
    />

    <DsDocSample
      title-zh="在本设计系统中"
      title-en="In this design system"
      intro-zh="文档站与视觉样例说明。"
      intro-en="Doc site and showcase."
      code-always-visible
      :code="SNIPPET_PANEL"
    >
      <div class="ds-ep__canvas ds-quick-start__panel">
        <el-alert type="info" :closable="false" show-icon>
          <template #title>文档站与样例页</template>
          <ul class="ds-quick__list ds-quick__list--compact">
            <li>
              侧栏切换各组件演示；<strong>设计变量</strong>页列出
              <code>--el-*</code>
              ，<strong>颜色</strong>页为 Figma 色板。
            </li>
            <li>顶栏<strong>视觉样例</strong>或 <code>#/showcase</code> 为全屏页。</li>
            <li><code>npm run dev</code>；离线构建 <code>npm run build:offline</code>。</li>
          </ul>
        </el-alert>
        <el-divider />
        <el-steps :active="3" finish-status="success" align-center>
          <el-step title="安装依赖" description="element-plus、@element-plus/icons-vue" />
          <el-step title="注册与样式" description="main.ts + CSS" />
          <el-step title="对照文档开发" description="侧栏 + 官方 API" />
        </el-steps>
      </div>
    </DsDocSample>
  </div>
</template>

<style scoped>
.ds-quick-after-sample {
  margin: 12px 0 32px;
  font-size: 13px;
  line-height: 22px;
  color: var(--ds-text-secondary);
}
</style>
