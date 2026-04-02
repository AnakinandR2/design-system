<script setup lang="ts">
import { WarningFilled } from '@element-plus/icons-vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'
import { POPCONFIRM_STYLES, POPCONFIRM_USAGE } from './popconfirm-snippets'
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Popconfirm</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="POPCONFIRM_USAGE" compact>
      <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="() => {}">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="宽度与图标" title-en="Width & icon" :code="POPCONFIRM_STYLES" compact>
      <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="() => {}">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
      <el-popconfirm width="220" title="带图标" :icon="WarningFilled" icon-color="#f56c6c" style="margin-left: 12px">
        <template #reference>
          <el-button>二次确认</el-button>
        </template>
      </el-popconfirm>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note"><code>disabled</code> 可加在触发元素上；确认/取消回调见 <code>@confirm</code>、<code>@cancel</code>。</p>
  </div>
</template>
