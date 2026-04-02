<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const checkList = ref(['a'])
const all = ref(false)
const indeterminate = ref(true)
const singleChecked = ref(false)

const SNIPPET_USAGE = `<template>
  <el-checkbox v-model="agree">同意协议</el-checkbox>
</template>`

const SNIPPET_GROUP = `<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="a">A</el-checkbox>
    <el-checkbox label="b">B</el-checkbox>
  </el-checkbox-group>
</template>`

const SNIPPET_STATES = `<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="c" disabled>C（禁用）</el-checkbox>
  </el-checkbox-group>
  <el-divider />
  <el-checkbox v-model="all" :indeterminate="indeterminate">全选不确定</el-checkbox>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Checkbox</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="单个复选" title-en="Single" :code="SNIPPET_USAGE" compact>
      <el-checkbox v-model="singleChecked">同意协议</el-checkbox>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="复选组" title-en="Group" :code="SNIPPET_GROUP" compact>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="a">A</el-checkbox>
        <el-checkbox label="b">B</el-checkbox>
      </el-checkbox-group>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用与全选" title-en="Disabled & indeterminate" :code="SNIPPET_STATES">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="a">A</el-checkbox>
        <el-checkbox label="b">B</el-checkbox>
        <el-checkbox label="c" disabled>C（禁用）</el-checkbox>
      </el-checkbox-group>
      <el-divider />
      <el-checkbox v-model="all" :indeterminate="indeterminate">全选样式</el-checkbox>
    </DsDocSample>
  </div>
</template>
