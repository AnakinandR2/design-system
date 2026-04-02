<script setup lang="ts">
import { ElNotification } from 'element-plus'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'
import { NOTIFICATION_STYLES, NOTIFICATION_USAGE } from './notification-snippets'

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
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>ElNotification</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="NOTIFICATION_USAGE" compact>
      <el-button type="primary" @click="open">打开通知</el-button>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="多种类型" title-en="Variants" :code="NOTIFICATION_STYLES" compact>
      <el-space wrap>
        <el-button type="primary" @click="open">打开通知</el-button>
        <el-button @click="openPlain">信息通知</el-button>
      </el-space>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">支持 <code>position</code>、<code>duration: 0</code> 常驻、<code>onClose</code> 等配置。</p>
  </div>
</template>
