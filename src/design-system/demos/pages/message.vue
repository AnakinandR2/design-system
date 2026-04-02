<script setup lang="ts">
import { ElMessage } from 'element-plus'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'
import { MESSAGE_STYLES, MESSAGE_USAGE } from './message-snippets'

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
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>ElMessage</code> 方法调用；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="MESSAGE_USAGE" compact>
      <el-button type="success" @click="openSuccess">成功</el-button>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="类型与时长" title-en="Types & duration" :code="MESSAGE_STYLES" compact>
      <el-space wrap>
        <el-button type="success" @click="openSuccess">成功</el-button>
        <el-button type="warning" @click="openWarning">警告</el-button>
        <el-button @click="openPlain">信息 5s</el-button>
      </el-space>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可设置 <code>showClose</code>、<code>grouping</code> 等；关闭与堆叠行为见官方 API。</p>
  </div>
</template>
