<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-empty description="暂无数据" />
</template>`

const SNIPPET_STYLES = `<template>
  <el-empty image-size="120" description="自定义描述">
    <el-button type="primary">去创建</el-button>
  </el-empty>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Empty</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-empty description="暂无数据" />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="插图尺寸与操作" title-en="Image & slot" :code="SNIPPET_STYLES" compact>
      <el-empty image-size="120" description="自定义描述">
        <el-button type="primary">去创建</el-button>
      </el-empty>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可通过 <code>image</code> 替换插图；无单独「禁用」态，多用于列表/详情无数据场景。</p>
  </div>
</template>
