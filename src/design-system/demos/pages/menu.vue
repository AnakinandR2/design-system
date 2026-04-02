<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const activeSimple = ref('1')
const activeSub = ref('1')

const SNIPPET_USAGE = `<template>
  <el-menu :default-active="active" class="ds-ep__menu-v" @select="(i: string) => (active = i)">
    <el-menu-item index="1"><span>导航一</span></el-menu-item>
    <el-menu-item index="2"><span>导航二</span></el-menu-item>
  </el-menu>
</template>`

const SNIPPET_STYLES = `<template>
  <el-menu :default-active="active" class="ds-ep__menu-v" @select="(i: string) => (active = i)">
    <el-menu-item index="1"><span>导航一</span></el-menu-item>
    <el-sub-menu index="2">
      <template #title>导航二</template>
      <el-menu-item index="2-1">子项 1</el-menu-item>
      <el-menu-item index="2-2">子项 2</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>`

const SNIPPET_STATE = `<template>
  <el-menu default-active="1" class="ds-ep__menu-v">
    <el-menu-item index="1">可用</el-menu-item>
    <el-menu-item index="2" disabled>禁用</el-menu-item>
  </el-menu>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus 侧栏 <code>Menu</code> 垂直模式；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE">
      <el-menu :default-active="activeSimple" class="ds-ep__menu-v" @select="(i: string) => (activeSimple = i)">
        <el-menu-item index="1"><span>导航一</span></el-menu-item>
        <el-menu-item index="2"><span>导航二</span></el-menu-item>
      </el-menu>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="子菜单" title-en="Sub-menu" :code="SNIPPET_STYLES">
      <el-menu :default-active="activeSub" class="ds-ep__menu-v" @select="(i: string) => (activeSub = i)">
        <el-menu-item index="1"><span>导航一</span></el-menu-item>
        <el-sub-menu index="2">
          <template #title>导航二</template>
          <el-menu-item index="2-1">子项 1</el-menu-item>
          <el-menu-item index="2-2">子项 2</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample title-zh="禁用项" title-en="Disabled" :code="SNIPPET_STATE" compact>
      <el-menu default-active="1" class="ds-ep__menu-v">
        <el-menu-item index="1">可用</el-menu-item>
        <el-menu-item index="2" disabled>禁用</el-menu-item>
      </el-menu>
    </DsDocSample>
  </div>
</template>
