<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-progress :percentage="50" />
</template>`

const SNIPPET_STYLES = `<template>
  <el-progress :percentage="30" />
  <el-divider />
  <el-progress :percentage="80" color="#67c23a" />
  <el-divider />
  <el-progress :percentage="50" type="circle" />
</template>`

const SNIPPET_STATE = `<template>
  <el-progress :percentage="50" status="exception" />
  <el-divider />
  <el-progress :percentage="100" status="success" />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Progress</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="线形进度" title-en="Line" :code="SNIPPET_USAGE">
      <el-progress :percentage="50" />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="颜色与环形" title-en="Color & circle" :code="SNIPPET_STYLES">
      <el-progress :percentage="30" />
      <el-divider />
      <el-progress :percentage="80" color="#67c23a" />
      <el-divider />
      <el-progress :percentage="50" type="circle" />
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="成功与异常" title-en="Success & exception" :code="SNIPPET_STATE">
      <el-progress :percentage="50" status="exception" />
      <el-divider />
      <el-progress :percentage="100" status="success" />
    </DsDocSample>
  </div>
</template>
