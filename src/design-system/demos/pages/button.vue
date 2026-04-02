<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Delete,
  Edit,
  Eleme,
  Message,
  Search,
  Share,
  Star,
  Upload,
} from '@element-plus/icons-vue'
import DsDocChapter from '../../doc/DsDocChapter.vue'
import DsDocSample from '../../doc/DsDocSample.vue'
import { BUTTON_SNIPPETS } from './button-snippets'

const linkButtons = [
  { type: '' as const, text: 'plain' },
  { type: 'primary' as const, text: 'primary' },
  { type: 'success' as const, text: 'success' },
  { type: 'info' as const, text: 'info' },
  { type: 'warning' as const, text: 'warning' },
  { type: 'danger' as const, text: 'danger' },
]
</script>

<template>
  <div class="ds-ep ds-doc-page ds-ep-button-samples">
    <p class="ds-ep__lead">
      基于 Element Plus
      <code>Button</code>
      ，视觉按 Figma「按钮规范」
      <a
        class="ds-ep__figma-link"
        href="https://www.figma.com/design/OXMz3vWSuvrhs6lcmJJS0a/%E6%B5%B7%E5%A4%96%E7%BB%BC%E5%90%88%E7%AB%99%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83%E6%B1%87%E6%80%BB?node-id=1-3068"
        target="_blank"
        rel="noopener noreferrer"
      >node 1:3068</a>
      。整页根节点含
      <code>ds-ep-button-samples</code>
      ，其下
      <code>el-button</code>
      均按该节点做圆角 8px、内边距 9×12、高度约 40px、主色/语义色与投影微调。文档结构参照
      <a
        class="ds-ep__figma-link"
        href="https://element-plus.org/zh-CN/component/button"
        target="_blank"
        rel="noopener noreferrer"
      >Element Plus 按钮</a>
      ：按「组件用法 → 组件样式 → 组件状态」组织；文末为 API。示例支持展开/复制代码。
    </p>

    <DsDocChapter kind="usage" />
    <DsDocSample
      title-zh="最小模板"
      title-en="Minimal template"
      intro-zh="全局注册 Element Plus 后，在 SFC 中直接使用 &lt;el-button&gt;。"
      intro-en="Use &lt;el-button&gt; in templates after registering Element Plus."
      :code="BUTTON_SNIPPETS.usage"
      compact
    >
      <div class="ds-doc-demo-row">
        <el-button type="primary">主要按钮</el-button>
        <el-button>默认按钮</el-button>
      </div>
    </DsDocSample>

    <DsDocChapter kind="styles" />
    <DsDocSample
      title-zh="基础用法"
      title-en="Basic usage"
      intro-zh="使用 type、plain、round、dashed、circle 与 icon 定义样式。"
      intro-en="Use type, plain, round, dashed, circle and icon."
      :code="BUTTON_SNIPPETS.basic"
    >
      <div class="ds-doc-demo-block">
        <div class="ds-doc-demo-row">
          <el-button>Default</el-button>
          <el-button type="primary">Primary</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="info">Info</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
        </div>
        <div class="ds-doc-demo-row">
          <el-button plain>Plain</el-button>
          <el-button type="primary" plain>Primary</el-button>
          <el-button type="success" plain>Success</el-button>
          <el-button type="info" plain>Info</el-button>
          <el-button type="warning" plain>Warning</el-button>
          <el-button type="danger" plain>Danger</el-button>
        </div>
        <div class="ds-doc-demo-row">
          <el-button round>Round</el-button>
          <el-button type="primary" round>Primary</el-button>
          <el-button type="success" round>Success</el-button>
          <el-button type="info" round>Info</el-button>
          <el-button type="warning" round>Warning</el-button>
          <el-button type="danger" round>Danger</el-button>
        </div>
        <div class="ds-doc-demo-row">
          <el-button dashed>Dashed</el-button>
          <el-button type="primary" dashed>Primary</el-button>
          <el-button type="success" dashed>Success</el-button>
          <el-button type="info" dashed>Info</el-button>
          <el-button type="warning" dashed>Warning</el-button>
          <el-button type="danger" dashed>Danger</el-button>
        </div>
        <div class="ds-doc-demo-row">
          <el-button :icon="Search" circle />
          <el-button type="primary" :icon="Edit" circle />
          <el-button type="success" :icon="Check" circle />
          <el-button type="info" :icon="Message" circle />
          <el-button type="warning" :icon="Star" circle />
          <el-button type="danger" :icon="Delete" circle />
        </div>
      </div>
    </DsDocSample>

    <DsDocSample
      title-zh="链接按钮"
      title-en="Link"
      intro-zh="使用 link 呈现链接样式的按钮，可配合 type 设置语义色。"
      intro-en="Use the link prop for link-style buttons."
      :code="BUTTON_SNIPPETS.link"
    >
      <div class="ds-doc-demo-block">
        <p class="ds-doc-demo-label">基础链接按钮</p>
        <div class="ds-doc-demo-row">
          <el-button v-for="b in linkButtons" :key="b.text" :type="b.type" link>
            {{ b.text }}
          </el-button>
        </div>
        <p class="ds-doc-demo-label">禁用</p>
        <div class="ds-doc-demo-row">
          <el-button v-for="b in linkButtons" :key="'d-' + b.text" :type="b.type" link disabled>
            {{ b.text }}
          </el-button>
        </div>
      </div>
    </DsDocSample>

    <DsDocSample
      title-zh="文字按钮"
      title-en="Text"
      intro-zh="使用 text 去掉边框与背景；bg 可保留浅色底。"
      intro-en="Use text for borderless style; bg adds a light background."
      :code="BUTTON_SNIPPETS.text"
    >
      <div class="ds-doc-demo-block">
        <p class="ds-doc-demo-label">文字按钮</p>
        <div class="ds-doc-demo-row">
          <el-button v-for="b in linkButtons" :key="b.text" :type="b.type" text>
            {{ b.text }}
          </el-button>
        </div>
        <p class="ds-doc-demo-label">带背景</p>
        <div class="ds-doc-demo-row">
          <el-button v-for="b in linkButtons" :key="'bg-' + b.text" :type="b.type" text bg>
            {{ b.text }}
          </el-button>
        </div>
        <p class="ds-doc-demo-label">禁用</p>
        <div class="ds-doc-demo-row">
          <el-button v-for="b in linkButtons" :key="'dis-' + b.text" :type="b.type" text disabled>
            {{ b.text }}
          </el-button>
        </div>
      </div>
    </DsDocSample>

    <DsDocSample
      title-zh="图标按钮"
      title-en="Icon"
      intro-zh="通过 icon 插槽或属性添加图标。"
      intro-en="Add icons via the icon prop or slots."
      :code="BUTTON_SNIPPETS.icon"
      compact
    >
      <div class="ds-doc-demo-row">
        <el-button type="primary" :icon="Edit" />
        <el-button type="primary" :icon="Share" />
        <el-button type="primary" :icon="Delete" />
        <el-button type="primary" :icon="Search">Search</el-button>
        <el-button type="primary">
          Upload
          <el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </div>
    </DsDocSample>

    <DsDocSample
      title-zh="按钮组"
      title-en="Button group"
      intro-zh="使用 el-button-group 组合一组操作。"
      intro-en="Use el-button-group to group actions."
      :code="BUTTON_SNIPPETS.group"
      compact
    >
      <el-button-group>
        <el-button type="primary" :icon="ArrowLeft">上一页</el-button>
        <el-button type="primary">
          下一页
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
    </DsDocSample>

    <DsDocSample
      title-zh="调整尺寸"
      title-en="Sizes"
      intro-zh="size 支持 large、default、small。"
      intro-en="size supports large, default, and small."
      :code="BUTTON_SNIPPETS.size"
    >
      <div class="ds-doc-demo-block">
        <div class="ds-doc-demo-row">
          <el-button size="large">Large</el-button>
          <el-button>Default</el-button>
          <el-button size="small">Small</el-button>
        </div>
        <div class="ds-doc-demo-row">
          <el-button type="primary" size="large" :icon="Search">Search</el-button>
          <el-button type="primary" :icon="Search">Search</el-button>
          <el-button type="primary" size="small" :icon="Search">Search</el-button>
        </div>
      </div>
    </DsDocSample>

    <DsDocSample
      title-zh="自定义标签（tag）"
      title-en="Custom tag"
      intro-zh="tag 可将按钮渲染为 div、a 等（2.3.4+），a 标签可配合 href。"
      intro-en="tag renders as div, anchor, etc. (2.3.4+)."
      :code="BUTTON_SNIPPETS.tag"
      compact
    >
      <div class="ds-doc-demo-row">
        <el-button>button</el-button>
        <el-button tag="div" role="button" tabindex="0">div</el-button>
        <el-button
          type="primary"
          tag="a"
          href="https://element-plus.org/zh-CN/component/button"
          target="_blank"
          rel="noopener noreferrer"
        >
          链接
        </el-button>
      </div>
    </DsDocSample>

    <DsDocChapter kind="states" />
    <DsDocSample
      title-zh="禁用"
      title-en="Disabled"
      intro-zh="disabled 禁用交互；plain 与实心均支持。"
      intro-en="disabled on solid and plain buttons."
      :code="BUTTON_SNIPPETS.disabled"
    >
      <div class="ds-doc-demo-block">
        <div class="ds-doc-demo-row">
          <el-button disabled>Default</el-button>
          <el-button type="primary" disabled>Primary</el-button>
          <el-button type="success" disabled>Success</el-button>
          <el-button type="info" disabled>Info</el-button>
          <el-button type="warning" disabled>Warning</el-button>
          <el-button type="danger" disabled>Danger</el-button>
        </div>
        <div class="ds-doc-demo-row">
          <el-button plain disabled>Plain</el-button>
          <el-button type="primary" plain disabled>Primary</el-button>
          <el-button type="success" plain disabled>Success</el-button>
          <el-button type="info" plain disabled>Info</el-button>
          <el-button type="warning" plain disabled>Warning</el-button>
          <el-button type="danger" plain disabled>Danger</el-button>
        </div>
      </div>
    </DsDocSample>

    <DsDocSample
      title-zh="加载中"
      title-en="Loading"
      intro-zh="loading 与 loading-icon。"
      intro-en="loading and loading-icon."
      :code="BUTTON_SNIPPETS.loading"
      compact
    >
      <div class="ds-doc-demo-row">
        <el-button type="primary" loading>Loading</el-button>
        <el-button type="primary" :loading-icon="Eleme" loading>Loading</el-button>
      </div>
    </DsDocSample>
  </div>
</template>
