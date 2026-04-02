<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const a = ref(false)
const b = ref(false)

const SNIPPET_USAGE = `<template>
  <el-button @click="visible = true">打开</el-button>
  <el-drawer v-model="visible" title="标题"><p>内容</p></el-drawer>
</template>`

const SNIPPET_STYLES = `<template>
  <el-button type="primary" @click="visible = true">打开抽屉</el-button>
  <el-drawer v-model="visible" title="标题" direction="rtl" size="320px">
    <p>抽屉内容区域。</p>
  </el-drawer>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Drawer</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-button @click="a = true">打开</el-button>
      <el-drawer v-model="a" title="标题"><p>内容</p></el-drawer>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="方向与尺寸" title-en="Direction & size" :code="SNIPPET_STYLES" compact>
      <el-button type="primary" @click="b = true">打开抽屉</el-button>
      <el-drawer v-model="b" title="标题" direction="rtl" size="320px">
        <p>抽屉内容区域。</p>
      </el-drawer>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可用 modal、close-on-click-modal 等控制遮罩与关闭逻辑。</p>
  </div>
</template>
