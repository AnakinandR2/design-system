<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-alert title="操作成功" type="success" />
</template>`

const SNIPPET_TYPES = `<template>
  <el-alert title="成功提示" type="success" show-icon :closable="false" />
  <el-alert title="消息提示" type="info" show-icon style="margin-top: 12px" />
  <el-alert title="警告提示" type="warning" show-icon style="margin-top: 12px" />
  <el-alert title="错误提示" type="error" show-icon style="margin-top: 12px" />
</template>`

const SNIPPET_STATE = `<template>
  <el-alert title="不可关闭" type="info" :closable="false" show-icon />
  <el-alert title="可关闭" type="info" closable show-icon style="margin-top: 12px" />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-alert-doc">
    <p class="ds-ep__lead">
      对应 Element Plus
      <code>Alert</code>
      。正文按组件用法、样式、状态划分；文末为 API。
    </p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-alert title="操作成功" type="success" />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample
      title-zh="类型与图标"
      title-en="Types & icon"
      intro-zh="success / info / warning / error，配合 show-icon。"
      intro-en="Semantic types with show-icon."
      :code="SNIPPET_TYPES"
    >
      <el-alert title="成功提示" type="success" show-icon :closable="false" />
      <el-alert title="消息提示" type="info" show-icon style="margin-top: 12px" />
      <el-alert title="警告提示" type="warning" show-icon style="margin-top: 12px" />
      <el-alert title="错误提示" type="error" show-icon style="margin-top: 12px" />
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="可关闭" title-en="Closable" :code="SNIPPET_STATE" compact>
      <el-alert title="不可关闭" type="info" :closable="false" show-icon />
      <el-alert title="可关闭" type="info" closable show-icon style="margin-top: 12px" />
    </DsDocSample>
  </div>
</template>
