export const MESSAGE_USAGE = `<script setup lang="ts">
import { ElMessage } from 'element-plus'

function openSuccess() {
  ElMessage.success('这是一条成功消息')
}
</script>

<template>
  <el-button type="success" @click="openSuccess">成功</el-button>
</template>`

export const MESSAGE_STYLES = `<script setup lang="ts">
import { ElMessage } from 'element-plus'

function openSuccess() {
  ElMessage.success('这是一条成功消息')
}
function openWarning() {
  ElMessage.warning('这是一条警告消息')
}
function openPlain() {
  ElMessage({ message: '自定义时长', type: 'info', duration: 5000 })
}
</script>

<template>
  <el-space wrap>
    <el-button type="success" @click="openSuccess">成功</el-button>
    <el-button type="warning" @click="openWarning">警告</el-button>
    <el-button @click="openPlain">信息 5s</el-button>
  </el-space>
</template>`

export const MESSAGE_SNIPPET = MESSAGE_STYLES
