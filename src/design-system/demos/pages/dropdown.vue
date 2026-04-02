<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-dropdown>
    <span>菜单</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>项</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>`

const SNIPPET_STYLES = `<template>
  <el-dropdown trigger="click">
    <span class="ds-ep__dropdown-link">
      下拉菜单
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item divided>狮子头</el-dropdown-item>
        <el-dropdown-item disabled>螺蛳粉</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Dropdown</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-dropdown>
        <span class="ds-ep__dropdown-link">菜单 <el-icon><ArrowDown /></el-icon></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>项</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="点击与条目" title-en="Click & items" :code="SNIPPET_STYLES" compact>
      <el-dropdown trigger="click">
        <span class="ds-ep__dropdown-link">
          下拉菜单
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item divided>狮子头</el-dropdown-item>
            <el-dropdown-item disabled>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">菜单内 <code>disabled</code> 项见上例；下拉整体禁用可用 <code>disabled</code>。</p>
  </div>
</template>
