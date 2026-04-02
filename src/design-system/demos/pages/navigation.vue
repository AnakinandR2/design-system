<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const activeSimple = ref('1')
const activeSub = ref('1')

const SNIPPET_USAGE = `<template>
  <el-menu :default-active="active" mode="horizontal" class="ds-ep__menu-h" @select="(i: string) => (active = i)">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2">订单管理</el-menu-item>
  </el-menu>
</template>`

const SNIPPET_STYLES = `<template>
  <el-menu :default-active="active" mode="horizontal" class="ds-ep__menu-h" @select="(i: string) => (active = i)">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项一</el-menu-item>
      <el-menu-item index="2-2">选项二</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>`

const SNIPPET_STATE = `<template>
  <el-menu mode="horizontal" class="ds-ep__menu-h" default-active="1">
    <el-menu-item index="1">可用</el-menu-item>
    <el-menu-item index="2" disabled>禁用</el-menu-item>
  </el-menu>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus 顶部导航 <code>Menu</code> 水平模式；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-menu :default-active="activeSimple" mode="horizontal" class="ds-ep__menu-h" @select="(i: string) => (activeSimple = i)">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2">订单管理</el-menu-item>
      </el-menu>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="下拉子菜单" title-en="Sub-menu" :code="SNIPPET_STYLES" compact>
      <el-menu :default-active="activeSub" mode="horizontal" class="ds-ep__menu-h" @select="(i: string) => (activeSub = i)">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-sub-menu index="2">
          <template #title>我的工作台</template>
          <el-menu-item index="2-1">选项一</el-menu-item>
          <el-menu-item index="2-2">选项二</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用项" title-en="Disabled" :code="SNIPPET_STATE" compact>
      <el-menu mode="horizontal" class="ds-ep__menu-h" default-active="1">
        <el-menu-item index="1">可用</el-menu-item>
        <el-menu-item index="2" disabled>禁用</el-menu-item>
      </el-menu>
    </DsDocSample>
  </div>
</template>
