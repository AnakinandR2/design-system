export const NOTIFICATION_USAGE = `<script setup lang="ts">
import { ElNotification } from 'element-plus'

function open() {
  ElNotification({
    title: '标题',
    message: '这是通知正文，可自动关闭。',
    type: 'success',
  })
}
</script>

<template>
  <el-button type="primary" @click="open">打开通知</el-button>
</template>`

export const NOTIFICATION_STYLES = `<script setup lang="ts">
import { ElNotification } from 'element-plus'

function open() {
  ElNotification({
    title: '标题',
    message: '这是通知正文，可自动关闭。',
    type: 'success',
  })
}
function openPlain() {
  ElNotification.info({ title: 'Info', message: '无图标样式可换 type' })
}
</script>

<template>
  <el-space wrap>
    <el-button type="primary" @click="open">打开通知</el-button>
    <el-button @click="openPlain">信息通知</el-button>
  </el-space>
</template>`

export const NOTIFICATION_SNIPPET = NOTIFICATION_STYLES
