<script setup lang="ts">
import { ref } from 'vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const mini = ref(false)
const full = ref(false)

const SNIPPET_USAGE = `<template>
  <el-button @click="visible = true">打开</el-button>
  <el-dialog v-model="visible" title="标题" class="ds-dialog-tianshuibi-close">内容</el-dialog>
</template>`

const SNIPPET_STYLES = `<template>
  <el-button type="primary" @click="visible = true">打开对话框</el-button>
  <el-dialog v-model="visible" class="ds-dialog-tianshuibi-close" title="提示" width="420px" destroy-on-close>
    <span>这是一段内容</span>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="visible = false">确定</el-button>
    </template>
  </el-dialog>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Dialog</code>（侧栏「对话框」）；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE" compact>
      <el-button @click="mini = true">打开</el-button>
      <el-dialog v-model="mini" title="标题" class="ds-dialog-tianshuibi-close">内容</el-dialog>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="宽度与页脚" title-en="Width & footer" :code="SNIPPET_STYLES" compact>
      <el-button type="primary" @click="full = true">打开对话框</el-button>
      <el-dialog v-model="full" class="ds-dialog-tianshuibi-close" title="提示" width="420px" destroy-on-close>
        <span>这是一段内容</span>
        <template #footer>
          <el-button @click="full = false">取消</el-button>
          <el-button type="primary" @click="full = false">确定</el-button>
        </template>
      </el-dialog>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可用 v-model 控制显隐；:close-on-click-modal、:show-close、fullscreen 等见官方 API。</p>
  </div>
</template>
