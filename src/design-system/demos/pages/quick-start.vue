<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import type { Lang } from '../../nav'
import DsDocSample from '../../doc/DsDocSample.vue'
import {
  SNIPPET_CONFIG_PROVIDER,
  SNIPPET_HELLO_SFC,
  SNIPPET_INSTALL,
  SNIPPET_MAIN_FULL,
  SNIPPET_MAIN_THIS_REPO,
  SNIPPET_TSCONFIG_TYPES,
  SNIPPET_VITE_ON_DEMAND,
} from './quick-start-snippets'

const dsLang = inject<Ref<Lang> | undefined>('dsLang', undefined)
const lang = computed(() => dsLang?.value ?? 'zh')
</script>

<template>
  <div class="ds-ep ds-doc-page ds-quick-start">
    <p class="ds-ep__lead">
      <template v-if="lang === 'zh'">
        和业务项目里常见的「快速上手」一样：装好依赖、在入口注册、页面里写一个组件就能跑。更细的选项（按需引入、TS、全局配置）默认收在下方折叠里；完整说明仍以
        <el-link href="https://element-plus.org/zh-CN/guide/quickstart" target="_blank" rel="noopener noreferrer" type="primary">
          Element Plus 快速开始
        </el-link>
        为准。
      </template>
      <template v-else>
        Like a typical quick start: install, register in entry, use one component. Advanced topics are collapsed below; see
        <el-link href="https://element-plus.org/en-US/guide/quickstart" target="_blank" rel="noopener noreferrer" type="primary">
          Element Plus quick start
        </el-link>
        for full docs.
      </template>
    </p>

    <el-alert type="info" :closable="false" show-icon class="ds-quick-tip">
      <template v-if="lang === 'zh'">
        本设计系统文档站 = Element Plus + 文档壳层样式；组件 API 见
        <el-link href="https://element-plus.org/zh-CN/component/overview" target="_blank" rel="noopener noreferrer" type="primary">
          官方组件总览
        </el-link>
        。视觉整页样例：
        <router-link to="/showcase">#/showcase</router-link>
      </template>
      <template v-else>
        This doc site is Element Plus + shell styles. APIs:
        <el-link href="https://element-plus.org/en-US/component/overview" target="_blank" rel="noopener noreferrer" type="primary">
          overview
        </el-link>
        . Full-page demo:
        <router-link to="/showcase">#/showcase</router-link>
      </template>
    </el-alert>

    <DsDocSample
      title-zh="1. 安装依赖"
      title-en="1. Install"
      intro-zh="在项目根目录执行。"
      intro-en="Run in project root."
      hide-preview
      code-always-visible
      :code="SNIPPET_INSTALL"
    />

    <DsDocSample
      title-zh="2. 入口注册（与本仓库一致）"
      title-en="2. Entry (same as this repo)"
      intro-zh="main.ts 中完整引入样式与 Element Plus；业务项目可去掉 design-system 相关两行。"
      intro-en="Full import in main.ts; drop design-system lines in your app if unused."
      hide-preview
      code-always-visible
      :code="SNIPPET_MAIN_THIS_REPO"
    />

    <DsDocSample
      title-zh="3. 页面里使用"
      title-en="3. Use in a page"
      intro-zh="任意 .vue 中直接使用组件（已全局注册时）。"
      intro-en="Use components in .vue when globally registered."
      hide-preview
      code-always-visible
      :code="SNIPPET_HELLO_SFC"
    />

    <el-collapse class="ds-quick-collapse">
      <el-collapse-item :title="lang === 'zh' ? '更多：官方最小 main.ts（无设计系统样式）' : 'More: minimal main.ts (no DS CSS)'">
        <DsDocSample
          title-zh="完整引入（官方对照）"
          title-en="Full import (official)"
          hide-preview
          code-always-visible
          :code="SNIPPET_MAIN_FULL"
        />
      </el-collapse-item>
      <el-collapse-item :title="lang === 'zh' ? '更多：按需导入（Vite）' : 'More: on-demand (Vite)'">
        <p class="ds-quick-collapse__hint">
          {{ lang === 'zh' ? '安装：' : 'Also install: ' }}
          <code>npm i -D unplugin-vue-components unplugin-auto-import</code>
        </p>
        <DsDocSample
          title-zh="vite.config"
          title-en="vite.config"
          hide-preview
          code-always-visible
          :code="SNIPPET_VITE_ON_DEMAND"
        />
        <p class="ds-quick-collapse__hint">
          <template v-if="lang === 'zh'">
            手动按组件 import 时需配合样式插件，见
            <el-link href="https://element-plus.org/zh-CN/guide/quickstart" target="_blank" rel="noopener noreferrer" type="primary">官方 · 手动导入</el-link>。
          </template>
          <template v-else>Manual per-component import: see Element Plus guide for style plugins.</template>
        </p>
      </el-collapse-item>
      <el-collapse-item :title="lang === 'zh' ? '更多：TypeScript / Volar' : 'More: TypeScript / Volar'">
        <DsDocSample
          title-zh="tsconfig"
          title-en="tsconfig"
          hide-preview
          code-always-visible
          :code="SNIPPET_TSCONFIG_TYPES"
        />
      </el-collapse-item>
      <el-collapse-item :title="lang === 'zh' ? '更多：全局 size / zIndex' : 'More: Global size / zIndex'">
        <DsDocSample
          title-zh="el-config-provider"
          title-en="el-config-provider"
          hide-preview
          code-always-visible
          :code="SNIPPET_CONFIG_PROVIDER"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.ds-quick-tip {
  margin-bottom: 24px;
}

.ds-quick-collapse {
  margin-top: 8px;
  border: none;
  --el-collapse-header-bg-color: transparent;
}

.ds-quick-collapse :deep(.el-collapse-item__header) {
  font-weight: 500;
  color: var(--ds-text);
}

.ds-quick-collapse :deep(.el-collapse-item__wrap) {
  border-bottom: 1px solid var(--ds-border);
}

.ds-quick-collapse__hint {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 22px;
  color: var(--ds-text-secondary);
}
</style>
