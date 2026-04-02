<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-card>简单卡片内容</el-card>
</template>`

const SNIPPET_STYLES = `<template>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-card shadow="hover">
        <template #header><span>标题</span></template>
        悬停阴影
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never">无阴影</el-card>
    </el-col>
  </el-row>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus <code>Card</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-card>简单卡片内容</el-card>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="标题与阴影" title-en="Header & shadow" :code="SNIPPET_STYLES">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <span>标题</span>
            </template>
            默认卡片内容，悬停阴影。
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">无阴影</el-card>
        </el-col>
      </el-row>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">Card 无独立 disabled；可通过内容区放置禁用表单控件实现只读态。</p>
  </div>
</template>
