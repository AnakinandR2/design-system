<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const tableData = [
  { date: '2026-04-01', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2026-04-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
  { date: '2026-04-03', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
]

const SNIPPET_USAGE = `<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="姓名" />
  </el-table>
</template>`

const SNIPPET_STYLES = `<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column prop="date" label="日期" width="140" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>`

const SNIPPET_STATE = `<template>
  <el-table :data="[]" empty-text="暂无数据" style="width: 100%">
    <el-table-column prop="a" label="列" />
  </el-table>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Table</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-table :data="tableData.slice(0, 1)">
        <el-table-column prop="name" label="姓名" />
      </el-table>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="斑马纹与边框" title-en="Stripe & border" :code="SNIPPET_STYLES">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="date" label="日期" width="140" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="空数据" title-en="Empty" :code="SNIPPET_STATE" compact>
      <el-table :data="[]" empty-text="暂无数据" style="width: 100%">
        <el-table-column prop="a" label="列" />
      </el-table>
    </DsDocSample>
  </div>
</template>
