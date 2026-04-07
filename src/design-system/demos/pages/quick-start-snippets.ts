/** 快速上手页展示的示例代码（独立 .ts 避免 .vue 内字符串误解析为 SFC 块） */

export const SNIPPET_MAIN_THIS_REPO = `import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/design-system.css'
import './assets/ds-page-bg-force.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')`

export const SNIPPET_MAIN_FULL = `import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')`

export const SNIPPET_VITE_ON_DEMAND = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})`

export const SNIPPET_TSCONFIG_TYPES = `{
  "compilerOptions": {
    "types": ["element-plus/global", "vite/client"]
  }
}`

export const SNIPPET_CONFIG_PROVIDER = `<el-config-provider :size="size" :z-index="zIndex">
  <app />
</el-config-provider>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'default' | 'large' | 'small'>('default')
const zIndex = ref(3000)
</script>`

/** 首屏「一页够用」：安装命令 + 最小页面 */
export const SNIPPET_INSTALL = `npm install element-plus @element-plus/icons-vue`

export const SNIPPET_HELLO_SFC = `<template>
  <el-button type="primary">Hello Element Plus</el-button>
</template>`
