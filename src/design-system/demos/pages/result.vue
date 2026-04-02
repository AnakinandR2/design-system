<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-result icon="success" title="成功提示" sub-title="请根据提示进行操作">
    <template #extra>
      <el-button type="primary">返回</el-button>
    </template>
  </el-result>
</template>`

const SNIPPET_STYLES = `<template>
  <el-result icon="warning" title="警告提示" sub-title="次要说明" />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Result</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="成功与操作区" title-en="Success & extra" :code="SNIPPET_USAGE">
      <el-result icon="success" title="成功提示" sub-title="请根据提示进行操作">
        <template #extra>
          <el-button type="primary">返回</el-button>
        </template>
      </el-result>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="其他图标" title-en="Other icons" :code="SNIPPET_STYLES">
      <el-result icon="warning" title="警告提示" sub-title="次要说明" />
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note"><code>icon</code> 支持 success / warning / info / error；也可用插槽完全自定义插图。</p>
  </div>
</template>
