<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const active = ref(0)

const SNIPPET_USAGE = `<template>
  <el-steps :active="1" finish-status="success">
    <el-step title="步骤 1" description="描述" />
    <el-step title="步骤 2" description="描述" />
    <el-step title="步骤 3" />
  </el-steps>
</template>`

const SNIPPET_STYLES = `<template>
  <el-steps :active="active" finish-status="success" align-center>
    <el-step title="步骤 1" description="描述" />
    <el-step title="步骤 2" description="描述" />
    <el-step title="步骤 3" />
  </el-steps>
  <el-divider />
  <el-button @click="active = Math.min(2, active + 1)">下一步</el-button>
  <el-button @click="active = Math.max(0, active - 1)">上一步</el-button>
</template>`

const SNIPPET_STATE = `<template>
  <el-steps :active="1" finish-status="success" process-status="error">
    <el-step title="失败示例" status="error" />
    <el-step title="步骤 2" />
  </el-steps>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Steps</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="静态步骤" title-en="Static" :code="SNIPPET_USAGE">
      <el-steps :active="1" finish-status="success">
        <el-step title="步骤 1" description="描述" />
        <el-step title="步骤 2" description="描述" />
        <el-step title="步骤 3" />
      </el-steps>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="居中与切换" title-en="Align & switch" :code="SNIPPET_STYLES">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="步骤 1" description="描述" />
        <el-step title="步骤 2" description="描述" />
        <el-step title="步骤 3" />
      </el-steps>
      <el-divider />
      <el-button @click="active = Math.min(2, active + 1)">下一步</el-button>
      <el-button @click="active = Math.max(0, active - 1)">上一步</el-button>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="错误态" title-en="Error" :code="SNIPPET_STATE">
      <el-steps :active="1" finish-status="success" process-status="error">
        <el-step title="失败示例" status="error" />
        <el-step title="步骤 2" />
      </el-steps>
    </DsDocSample>
  </div>
</template>
