<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const value = ref('')
const options = [
  { value: 'a', label: '选项 A' },
  { value: 'b', label: '选项 B' },
  { value: 'c', label: '选项 C' },
]

const SNIPPET_USAGE = `<template>
  <el-select v-model="value" placeholder="请选择" style="width: 200px">
    <el-option label="A" value="a" />
  </el-select>
</template>`

const SNIPPET_STYLES = `<template>
  <el-select v-model="value" placeholder="请选择" clearable style="width: 200px">
    <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
  </el-select>
  <el-select v-model="value" multiple placeholder="多选" clearable collapse-tags style="width: 240px; margin-left: 12px">
    <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
  </el-select>
</template>`

const SNIPPET_STATE = `<template>
  <el-select model-value="" placeholder="禁用" disabled style="width: 200px">
    <el-option label="A" value="a" />
  </el-select>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Select</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-select v-model="value" placeholder="请选择" style="width: 200px">
        <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
      </el-select>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="单选与多选" title-en="Single & multiple" :code="SNIPPET_STYLES" compact>
      <el-space wrap>
        <el-select v-model="value" placeholder="请选择" clearable style="width: 200px">
          <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="value" multiple placeholder="多选" clearable collapse-tags style="width: 240px">
          <el-option v-for="o in options" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
      </el-space>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用" title-en="Disabled" :code="SNIPPET_STATE" compact>
      <el-select model-value="" placeholder="禁用" disabled style="width: 200px">
        <el-option label="A" value="a" />
      </el-select>
    </DsDocSample>
  </div>
</template>
