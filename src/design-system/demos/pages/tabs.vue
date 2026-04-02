<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const active = ref('first')

const SNIPPET_USAGE = `<template>
  <el-tabs v-model="active">
    <el-tab-pane label="Tab" name="a">内容</el-tab-pane>
  </el-tabs>
</template>`

const SNIPPET_LINE = `<template>
  <el-tabs v-model="active">
    <el-tab-pane label="用户管理" name="first">内容一</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">内容二</el-tab-pane>
    <el-tab-pane label="角色管理" name="third" disabled>禁用</el-tab-pane>
  </el-tabs>
</template>`

const SNIPPET_CARD = `<template>
  <el-tabs v-model="active" type="card">
    <el-tab-pane label="A" name="first" />
    <el-tab-pane label="B" name="second" />
  </el-tabs>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Tabs</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-tabs v-model="active">
        <el-tab-pane label="Tab" name="first">内容</el-tab-pane>
      </el-tabs>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="线性标签" title-en="Line" :code="SNIPPET_LINE">
      <el-tabs v-model="active" class="ds-ep__tabs">
        <el-tab-pane label="用户管理" name="first">内容一</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">内容二</el-tab-pane>
        <el-tab-pane label="角色管理" name="third" disabled>禁用</el-tab-pane>
      </el-tabs>
    </DsDocSample>
    <DsDocSample title-zh="卡片标签" title-en="Card" :code="SNIPPET_CARD" compact>
      <el-tabs v-model="active" type="card">
        <el-tab-pane label="A" name="first" />
        <el-tab-pane label="B" name="second" />
      </el-tabs>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">禁用态见上线性示例中的「角色管理」页签。</p>
  </div>
</template>
