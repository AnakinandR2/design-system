<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const v1 = ref('')

const SNIPPET_USAGE = `<template>
  <el-input v-model="text" placeholder="请输入" clearable />
</template>`

const SNIPPET_BASIC = `<template>
  <el-space direction="vertical" :fill="true" style="width: 100%; max-width: 420px">
    <el-input v-model="v1" placeholder="请输入" clearable />
    <el-input type="password" placeholder="密码" show-password />
  </el-space>
</template>`

const SNIPPET_SLOT = `<template>
  <el-input placeholder="带前缀后缀">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </el-input>
</template>`

const SNIPPET_STATE = `<template>
  <el-input model-value="禁用态" disabled />
  <el-input model-value="只读" readonly style="margin-top: 12px" />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-input-doc">
    <p class="ds-ep__lead">对应 Element Plus <code>Input</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-input v-model="v1" placeholder="请输入" clearable />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="类型与能力" title-en="Types" intro-zh="清空、密码可见。" intro-en="Clearable and password." :code="SNIPPET_BASIC">
      <el-space direction="vertical" :fill="true" style="width: 100%; max-width: 420px">
        <el-input v-model="v1" placeholder="请输入" clearable />
        <el-input type="password" placeholder="密码" show-password />
      </el-space>
    </DsDocSample>
    <DsDocSample title-zh="组合插槽" title-en="Slots" intro-zh="prepend / append。" intro-en="Prepend and append." :code="SNIPPET_SLOT" compact>
      <el-input placeholder="带前缀后缀">
        <template #prepend>https://</template>
        <template #append>.com</template>
      </el-input>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用与只读" title-en="Disabled & readonly" :code="SNIPPET_STATE" compact>
      <el-input model-value="禁用态" disabled />
      <el-input model-value="只读" readonly style="margin-top: 12px" />
    </DsDocSample>
  </div>
</template>
