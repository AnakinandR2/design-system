/** 与按钮页各小节预览对应的示例代码（对齐 Element Plus 文档结构） */

export const BUTTON_SNIPPETS = {
  usage: `<template>
  <el-button type="primary">主要按钮</el-button>
  <el-button>默认按钮</el-button>
</template>

<!-- 项目已在 main.ts 中 app.use(ElementPlus)，模板中可直接写 el-button -->`,

  basic: `<template>
  <div class="demo-block">
    <div class="demo-row">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <div class="demo-row">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>
    <div class="demo-row">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </div>
    <div class="demo-row">
      <el-button dashed>Dashed</el-button>
      <el-button type="primary" dashed>Primary</el-button>
      <el-button type="success" dashed>Success</el-button>
      <el-button type="info" dashed>Info</el-button>
      <el-button type="warning" dashed>Warning</el-button>
      <el-button type="danger" dashed>Danger</el-button>
    </div>
    <div class="demo-row">
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
</script>

<style scoped>
.demo-block { display: flex; flex-direction: column; gap: 1rem; }
.demo-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }
</style>`,

  disabled: `<template>
  <div class="demo-block">
    <div class="demo-row">
      <el-button disabled>Default</el-button>
      <el-button type="primary" disabled>Primary</el-button>
      <el-button type="success" disabled>Success</el-button>
      <el-button type="info" disabled>Info</el-button>
      <el-button type="warning" disabled>Warning</el-button>
      <el-button type="danger" disabled>Danger</el-button>
    </div>
    <div class="demo-row">
      <el-button plain disabled>Plain</el-button>
      <el-button type="primary" plain disabled>Primary</el-button>
      <el-button type="success" plain disabled>Success</el-button>
      <el-button type="info" plain disabled>Info</el-button>
      <el-button type="warning" plain disabled>Warning</el-button>
      <el-button type="danger" plain disabled>Danger</el-button>
    </div>
  </div>
</template>`,

  link: `<template>
  <p class="demo-label">基础链接按钮</p>
  <div class="demo-row">
    <el-button v-for="b in buttons" :key="b.text" :type="b.type" link>
      {{ b.text }}
    </el-button>
  </div>
  <p class="demo-label">禁用</p>
  <div class="demo-row">
    <el-button v-for="b in buttons" :key="'d-' + b.text" :type="b.type" link disabled>
      {{ b.text }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const
</script>`,

  text: `<template>
  <p class="demo-label">文字按钮</p>
  <div class="demo-row">
    <el-button v-for="b in buttons" :key="b.text" :type="b.type" text>
      {{ b.text }}
    </el-button>
  </div>
  <p class="demo-label">带背景</p>
  <div class="demo-row">
    <el-button v-for="b in buttons" :key="'bg-' + b.text" :type="b.type" text bg>
      {{ b.text }}
    </el-button>
  </div>
  <p class="demo-label">禁用</p>
  <div class="demo-row">
    <el-button v-for="b in buttons" :key="'dis-' + b.text" :type="b.type" text disabled>
      {{ b.text }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const
</script>`,

  icon: `<template>
  <div class="demo-row">
    <el-button type="primary" :icon="Edit" />
    <el-button type="primary" :icon="Share" />
    <el-button type="primary" :icon="Delete" />
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary">
      Upload<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
</script>`,

  group: `<template>
  <el-button-group class="demo-row">
    <el-button type="primary" :icon="ArrowLeft">上一页</el-button>
    <el-button type="primary">
      下一页<el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
</script>`,

  loading: `<template>
  <div class="demo-row">
    <el-button type="primary" loading>Loading</el-button>
    <el-button type="primary" :loading-icon="Eleme" loading>Loading</el-button>
  </div>
</template>

<script setup lang="ts">
import { Eleme } from '@element-plus/icons-vue'
</script>`,

  size: `<template>
  <div class="demo-block">
    <div class="demo-row">
      <el-button size="large">Large</el-button>
      <el-button>Default</el-button>
      <el-button size="small">Small</el-button>
    </div>
    <div class="demo-row">
      <el-button type="primary" size="large" :icon="Search">Search</el-button>
      <el-button type="primary" :icon="Search">Search</el-button>
      <el-button type="primary" size="small" :icon="Search">Search</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>`,

  tag: `<template>
  <div class="demo-row">
    <el-button>button</el-button>
    <el-button tag="div" role="button" tabindex="0">div</el-button>
    <el-button
      type="primary"
      tag="a"
      href="https://element-plus.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      链接
    </el-button>
  </div>
</template>`,
} as const
