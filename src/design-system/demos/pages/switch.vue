<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const on = ref(true)

const SNIPPET_USAGE = `<template>
  <el-switch v-model="on" />
</template>`

const SNIPPET_STYLES = `<template>
  <el-switch v-model="on" inline-prompt active-text="开" inactive-text="关" />
</template>`

const SNIPPET_STATE = `<template>
  <el-switch v-model="on" disabled />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Switch</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-switch v-model="on" />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="内嵌文案" title-en="Inline text" :code="SNIPPET_STYLES" compact>
      <el-switch v-model="on" inline-prompt active-text="开" inactive-text="关" />
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用" title-en="Disabled" :code="SNIPPET_STATE" compact>
      <el-switch v-model="on" disabled />
    </DsDocSample>
  </div>
</template>
