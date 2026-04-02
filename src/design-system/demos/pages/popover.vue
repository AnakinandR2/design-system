<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-popover placement="top-start" title="标题" :width="200" trigger="hover" content="这是一段内容。">
    <template #reference>
      <el-button>Hover 激活</el-button>
    </template>
  </el-popover>
</template>`

const SNIPPET_STYLES = `<template>
  <el-popover placement="right" :width="220" trigger="click">
    <template #reference>
      <el-button>Click 激活</el-button>
    </template>
    <div>自定义内容插槽</div>
  </el-popover>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Popover</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="Hover 与属性" title-en="Hover" :code="SNIPPET_USAGE" compact>
      <el-popover placement="top-start" title="标题" :width="200" trigger="hover" content="这是一段内容。">
        <template #reference>
          <el-button>Hover 激活</el-button>
        </template>
      </el-popover>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="Click 与插槽" title-en="Click & slot" :code="SNIPPET_STYLES" compact>
      <el-popover placement="right" :width="220" trigger="click">
        <template #reference>
          <el-button>Click 激活</el-button>
        </template>
        <div>自定义内容插槽</div>
      </el-popover>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">触发元素可配合 <code>disabled</code>；弹出层显隐可用 <code>v-model:visible</code> 受控。</p>
  </div>
</template>
