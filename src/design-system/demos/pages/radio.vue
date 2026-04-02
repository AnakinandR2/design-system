<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const r = ref('1')

const SNIPPET_USAGE = `<template>
  <el-radio-group v-model="r">
    <el-radio label="1">选项</el-radio>
  </el-radio-group>
</template>`

const SNIPPET_STYLES = `<template>
  <el-radio-group v-model="r">
    <el-radio label="1">选项 1</el-radio>
    <el-radio label="2">选项 2</el-radio>
  </el-radio-group>
</template>`

const SNIPPET_BTN = `<template>
  <el-radio-group v-model="r">
    <el-radio-button label="1">A</el-radio-button>
    <el-radio-button label="2">B</el-radio-button>
    <el-radio-button label="3">C</el-radio-button>
  </el-radio-group>
</template>`

const SNIPPET_STATE = `<template>
  <el-radio-group v-model="r">
    <el-radio label="3" disabled>禁用</el-radio>
  </el-radio-group>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Radio</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-radio-group v-model="r">
        <el-radio label="1">选项</el-radio>
      </el-radio-group>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="单选框" title-en="Radio" :code="SNIPPET_STYLES" compact>
      <el-radio-group v-model="r">
        <el-radio label="1">选项 1</el-radio>
        <el-radio label="2">选项 2</el-radio>
      </el-radio-group>
    </DsDocSample>
    <DsDocSample title-zh="按钮样式" title-en="Radio button" :code="SNIPPET_BTN" compact>
      <el-radio-group v-model="r">
        <el-radio-button label="1">A</el-radio-button>
        <el-radio-button label="2">B</el-radio-button>
        <el-radio-button label="3">C</el-radio-button>
      </el-radio-group>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用项" title-en="Disabled" :code="SNIPPET_STATE" compact>
      <el-radio-group v-model="r">
        <el-radio label="1">选项 1</el-radio>
        <el-radio label="2">选项 2</el-radio>
        <el-radio label="3" disabled>禁用</el-radio>
      </el-radio-group>
    </DsDocSample>
  </div>
</template>
