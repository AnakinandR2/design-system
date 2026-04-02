<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>当前页</el-breadcrumb-item>
  </el-breadcrumb>
</template>`

const SNIPPET_TEXT = `<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>组件</el-breadcrumb-item>
    <el-breadcrumb-item>面包屑</el-breadcrumb-item>
  </el-breadcrumb>
</template>`

const SNIPPET_ICON = `<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>一级</el-breadcrumb-item>
    <el-breadcrumb-item>二级</el-breadcrumb-item>
  </el-breadcrumb>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Breadcrumb</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>当前页</el-breadcrumb-item>
      </el-breadcrumb>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="文字分隔与路由" title-en="Text & to" :code="SNIPPET_TEXT" compact>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组件</el-breadcrumb-item>
        <el-breadcrumb-item>面包屑</el-breadcrumb-item>
      </el-breadcrumb>
    </DsDocSample>
    <DsDocSample title-zh="图标分隔" title-en="Icon" :code="SNIPPET_ICON" compact>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>一级</el-breadcrumb-item>
        <el-breadcrumb-item>二级</el-breadcrumb-item>
      </el-breadcrumb>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">面包屑无禁用态；末级高亮可通过样式或路由高亮实现。</p>
  </div>
</template>
