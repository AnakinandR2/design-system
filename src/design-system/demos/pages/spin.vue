<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'
import { SPIN_STYLES, SPIN_USAGE } from './spin-snippets'

const loading = ref(true)
</script>

<template>
  <div class="ds-ep ds-doc-page">
    <p class="ds-ep__lead">对应 Element Plus 加载：<code>v-loading</code> 指令与 <code>Loading</code> 图标；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="指令遮罩" title-en="Directive" :code="SPIN_USAGE">
      <div v-loading="loading" class="ds-ep__spin-box" element-loading-text="加载中...">
        内容区域（指令遮罩）
      </div>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="开关与图标" title-en="Switch & icon" :code="SPIN_STYLES">
      <el-switch v-model="loading" active-text="加载中" inactive-text="静止" style="margin-bottom: 12px" />
      <div
        v-loading="loading"
        class="ds-ep__spin-box"
        element-loading-text="加载中..."
      >
        内容区域（指令遮罩）
      </div>
      <el-divider />
      <el-icon class="ds-ep__spin-icon is-loading"><Loading /></el-icon>
      <span style="margin-left: 8px; vertical-align: middle">图标旋转</span>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可用 <code>element-loading-spinner</code> 自定义图标；全屏加载使用 <code>ElLoading.service</code>。</p>
  </div>
</template>
