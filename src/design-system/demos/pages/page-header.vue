<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-page-header @back="() => {}">
    <template #content>
      <span class="ds-ep__ph-title">页头标题</span>
    </template>
  </el-page-header>
</template>`

const SNIPPET_STYLES = `<template>
  <el-page-header @back="() => {}">
    <template #content>
      <span class="ds-ep__ph-title">页头标题</span>
    </template>
    <template #extra>
      <el-button size="small">操作</el-button>
    </template>
    这是页头下方的说明区域，可放表单或详情。
  </el-page-header>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>PageHeader</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE">
      <el-page-header @back="() => {}">
        <template #content>
          <span class="ds-ep__ph-title">页头标题</span>
        </template>
      </el-page-header>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="操作区与默认插槽" title-en="Extra & default" :code="SNIPPET_STYLES">
      <el-page-header @back="() => {}">
        <template #content>
          <span class="ds-ep__ph-title">页头标题</span>
        </template>
        <template #extra>
          <el-button size="small">操作</el-button>
        </template>
        这是页头下方的说明区域，可放表单或详情。
      </el-page-header>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">返回行为由 <code>@back</code> 处理；可通过 <code>icon</code>、<code>title</code> 等 props 定制。</p>
  </div>
</template>
