<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-skeleton :rows="5" animated />
</template>`

const SNIPPET_STYLES = `<template>
  <el-skeleton style="width: 260px">
    <template #template>
      <el-skeleton-item variant="image" style="width: 260px; height: 120px" />
      <div style="padding: 12px 0 0">
        <el-skeleton-item variant="h3" style="width: 55%" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" style="width: 35%" />
      </div>
    </template>
  </el-skeleton>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Skeleton</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="段落占位" title-en="Rows" :code="SNIPPET_USAGE">
      <el-skeleton :rows="5" animated />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="自定义模板" title-en="Template" :code="SNIPPET_STYLES">
      <el-skeleton style="width: 260px">
        <template #template>
          <el-skeleton-item variant="image" style="width: 260px; height: 120px" />
          <div style="padding: 12px 0 0">
            <el-skeleton-item variant="h3" style="width: 55%" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" style="width: 35%" />
          </div>
        </template>
      </el-skeleton>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">配合 <code>loading</code> 可在数据返回前显示骨架；子项 <code>variant</code> 控制形状。</p>
  </div>
</template>
