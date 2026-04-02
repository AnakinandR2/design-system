<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const d = ref('')
const range = ref<[string, string] | null>(null)

const SNIPPET_USAGE = `<template>
  <el-date-picker v-model="d" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
</template>`

const SNIPPET_STYLES = `<template>
  <el-space wrap>
    <el-date-picker v-model="d" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
    <el-date-picker
      v-model="range"
      type="daterange"
      range-separator="至"
      start-placeholder="开始"
      end-placeholder="结束"
      value-format="YYYY-MM-DD"
    />
  </el-space>
</template>`

const SNIPPET_STATE = `<template>
  <el-date-picker type="date" placeholder="禁用" disabled />
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>DatePicker</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-date-picker v-model="d" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="日期与范围" title-en="Date & range" :code="SNIPPET_STYLES" compact>
      <el-space wrap>
        <el-date-picker v-model="d" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
        <el-date-picker
          v-model="range"
          type="daterange"
          range-separator="至"
          start-placeholder="开始"
          end-placeholder="结束"
          value-format="YYYY-MM-DD"
        />
      </el-space>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用" title-en="Disabled" :code="SNIPPET_STATE" compact>
      <el-date-picker type="date" placeholder="禁用" disabled />
    </DsDocSample>
  </div>
</template>
