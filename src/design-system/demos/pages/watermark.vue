<script setup lang="ts">
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'

const SNIPPET_USAGE = `<template>
  <el-watermark content="Design System">
    <div class="ds-ep__wm-inner">
      <p>水印覆盖区域内的正文内容。</p>
    </div>
  </el-watermark>
</template>`

const SNIPPET_STYLES = `<template>
  <el-watermark
    content="Confidential"
    :font="{ color: 'rgba(0,0,0,.12)', fontSize: 14 }"
    :rotate="-12"
    :gap="[120, 100]"
  >
    <div class="ds-ep__wm-inner">
      <p>自定义字体、间距与旋转角。</p>
      <el-button size="small">示例按钮</el-button>
    </div>
  </el-watermark>
</template>`
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">对应 Element Plus <code>Watermark</code>；文末 API。</p>

    <DsDocChapter kind="usage" />
    <DsDocSample title-zh="最小示例" title-en="Minimal" :code="SNIPPET_USAGE">
      <el-watermark content="Design System">
        <div class="ds-ep__wm-inner">
          <p>水印覆盖区域内的正文内容。</p>
        </div>
      </el-watermark>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample title-zh="字体与间距" title-en="Font & gap" :code="SNIPPET_STYLES">
      <el-watermark
        content="Confidential"
        :font="{ color: 'rgba(0,0,0,.12)', fontSize: 14 }"
        :rotate="-12"
        :gap="[120, 100]"
      >
        <div class="ds-ep__wm-inner">
          <p>自定义字体、间距与旋转角。</p>
          <el-button size="small">示例按钮</el-button>
        </div>
      </el-watermark>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <p class="ds-doc-chapter__note">可用 <code>z-index</code> 控制层级；局部防篡改可结合业务权限与水印内容。</p>
  </div>
</template>
