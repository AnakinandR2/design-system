export const POPCONFIRM_USAGE = `<template>
  <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="() => {}">
    <template #reference>
      <el-button type="danger">删除</el-button>
    </template>
  </el-popconfirm>
</template>`

export const POPCONFIRM_STYLES = `<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue'
</script>

<template>
  <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="() => {}">
    <template #reference>
      <el-button type="danger">删除</el-button>
    </template>
  </el-popconfirm>
  <el-popconfirm width="220" title="带图标" :icon="WarningFilled" icon-color="#f56c6c" style="margin-left: 12px">
    <template #reference>
      <el-button>二次确认</el-button>
    </template>
  </el-popconfirm>
</template>`

export const POPCONFIRM_SNIPPET = POPCONFIRM_STYLES
