<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-tag>标签</el-tag>
</template>`

const SNIPPET_STYLES = `<template>
  <el-space wrap>
    <el-tag>Default</el-tag>
    <el-tag type="success">Success</el-tag>
    <el-tag type="info">Info</el-tag>
    <el-tag type="warning">Warning</el-tag>
    <el-tag type="danger">Danger</el-tag>
    <el-tag round>Round</el-tag>
    <el-tag effect="dark">Dark</el-tag>
    <el-tag effect="plain">Plain</el-tag>
  </el-space>
</template>`

const SNIPPET_STATES = `<template>
  <el-tag closable @close="() => {}">可关闭</el-tag>
  <el-tag type="info" disabled style="margin-left: 8px">禁用</el-tag>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Tag</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-tag>标签</el-tag>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="类型与外观" title-en="Types & look" :code="SNIPPET_STYLES" compact>
      <el-space wrap>
        <el-tag>Default</el-tag>
        <el-tag type="success">Success</el-tag>
        <el-tag type="info">Info</el-tag>
        <el-tag type="warning">Warning</el-tag>
        <el-tag type="danger">Danger</el-tag>
        <el-tag round>Round</el-tag>
        <el-tag effect="dark">Dark</el-tag>
        <el-tag effect="plain">Plain</el-tag>
      </el-space>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="可关闭与禁用" title-en="Closable & disabled" :code="SNIPPET_STATES" compact>
      <el-tag closable @close="() => {}">可关闭</el-tag>
      <el-tag type="info" disabled style="margin-left: 8px">禁用</el-tag>
    </DsDocSample>
  </div>
</template>
