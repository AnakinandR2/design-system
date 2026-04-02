<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, inject, ref, type Ref } from 'vue'
import type { Lang } from '../nav'

const props = withDefaults(
  defineProps<{
    titleZh: string
    titleEn: string
    code: string
    /** 预览区更紧凑（多行小组件） */
    compact?: boolean
    /** 无运行区，仅标题 + 工具栏 + 可展开代码（适合快速上手等纯配置段落） */
    hidePreview?: boolean
    /** 代码区始终展开，隐藏「显示/隐藏代码」（如快速上手页） */
    codeAlwaysVisible?: boolean
    introZh?: string
    introEn?: string
  }>(),
  { compact: false, hidePreview: false, codeAlwaysVisible: false },
)

const dsLangRef = inject<Ref<Lang> | undefined>('dsLang', undefined)
const lang = computed(() => dsLangRef?.value ?? 'zh')

const title = computed(() => (lang.value === 'zh' ? props.titleZh : props.titleEn))
const intro = computed(() => {
  if (lang.value === 'zh') return props.introZh ?? ''
  return props.introEn ?? ''
})

const expanded = ref(false)

const toggleLabel = computed(() => {
  if (lang.value === 'zh') return expanded.value ? '隐藏代码' : '显示代码'
  return expanded.value ? 'Hide code' : 'Show code'
})

const copyLabel = computed(() => (lang.value === 'zh' ? '复制代码' : 'Copy'))

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    ElMessage.success(lang.value === 'zh' ? '已复制' : 'Copied')
  } catch {
    ElMessage.error(lang.value === 'zh' ? '复制失败' : 'Copy failed')
  }
}
</script>

<template>
  <section class="arco-doc-sample ds-doc-sample">
    <h2 class="ds-doc-section-title">{{ title }}</h2>
    <p v-if="intro" class="ds-doc-section-intro">{{ intro }}</p>

    <div
      class="arco-doc-sample__card"
      :class="{ 'arco-doc-sample__card--code-only': hidePreview }"
    >
      <div
        v-if="!hidePreview"
        class="arco-doc-sample__preview"
        :class="{ 'arco-doc-sample__preview--compact': compact }"
      >
        <slot />
      </div>

      <div
        class="arco-doc-sample__toolbar ds-doc-sample__toolbar"
        :class="{ 'arco-doc-sample__toolbar--flush-top': hidePreview }"
      >
        <span class="ds-doc-sample__toolbar-spacer" aria-hidden="true" />
        <div class="ds-doc-sample__toolbar-actions">
          <button
            v-if="!codeAlwaysVisible"
            type="button"
            class="ds-doc-toolbar-text"
            :aria-expanded="expanded"
            @click="expanded = !expanded"
          >
            {{ toggleLabel }}
          </button>
          <button
            type="button"
            class="arco-doc-sample__tool"
            :title="copyLabel"
            :aria-label="copyLabel"
            @click="copyCode"
          >
            <svg class="arco-doc-sample__tool-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          </button>
        </div>
      </div>

      <div v-show="codeAlwaysVisible || expanded" class="arco-doc-sample__code">
        <pre class="arco-doc-sample__pre"><code class="arco-doc-sample__code-inner">{{ code }}</code></pre>
      </div>
    </div>
  </section>
</template>
