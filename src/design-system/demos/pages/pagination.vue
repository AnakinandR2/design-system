<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const pageSimple = ref(1)
const page = ref(1)
const size = ref(10)
const total = ref(86)

const SNIPPET_USAGE = `<template>
  <el-pagination v-model:current-page="page" layout="prev, pager, next" :total="50" />
</template>`

const SNIPPET_STYLES = `<template>
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="size"
    :page-sizes="[10, 20, 50]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    background
  />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Pagination</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-pagination v-model:current-page="pageSimple" layout="prev, pager, next" :total="50" />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="完整布局" title-en="Full layout" :code="SNIPPET_STYLES" compact>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="size"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      />
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可用 <code>disabled</code> 禁用交互；单页时隐藏分页可通过 <code>hide-on-single-page</code>。</p>
  </div>
</template>
