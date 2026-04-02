export const SPIN_USAGE = `<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div v-loading="loading" class="ds-ep__spin-box" element-loading-text="加载中...">
    内容区域（指令遮罩）
  </div>
</template>`

export const SPIN_STYLES = `<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from '@element-plus/icons-vue'

const loading = ref(true)
</script>

<template>
  <el-switch v-model="loading" active-text="加载中" inactive-text="静止" style="margin-bottom: 12px" />
  <div v-loading="loading" class="ds-ep__spin-box" element-loading-text="加载中...">
    内容区域（指令遮罩）
  </div>
  <el-divider />
  <el-icon class="ds-ep__spin-icon is-loading"><Loading /></el-icon>
  <span style="margin-left: 8px; vertical-align: middle">图标旋转</span>
</template>`

/** 完整示例（兼容旧引用） */
export const SPIN_SNIPPET = SPIN_STYLES
