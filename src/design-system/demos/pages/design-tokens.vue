<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import type { Lang } from '../../nav'
import { getElColorDesignSpec } from '../../tokens/element-el-to-design-spec'
import {
  ELEMENT_PLUS_TOKEN_GROUPS,
  allElTokenNames,
  type ElTokenGroup,
  type ElTokenRow,
} from '../../tokens/element-plus-token-doc'
import DsDocSample from '../../doc/DsDocSample.vue'
import { TOKENS_INJECT_SNIPPET } from './design-tokens-snippets'

const dsLangRef = inject<Ref<Lang> | undefined>('dsLang', undefined)
const docLang = computed(() => dsLangRef?.value ?? 'zh')

const groups = ELEMENT_PLUS_TOKEN_GROUPS
const resolved = ref<Record<string, string>>({})

function refreshResolved() {
  const root = document.documentElement
  const next: Record<string, string> = {}
  for (const name of allElTokenNames()) {
    let v = getComputedStyle(root).getPropertyValue(name).trim()
    if (!v) v = '—'
    next[name] = v
  }
  resolved.value = next
}

onMounted(() => {
  refreshResolved()
})

watch(
  () => document.documentElement.getAttribute('data-theme'),
  () => {
    requestAnimationFrame(refreshResolved)
  },
)

function sectionTitle(g: ElTokenGroup) {
  return docLang.value === 'zh' ? `${g.titleZh} ${g.titleEn}` : g.titleEn
}

function sectionIntro(g: ElTokenGroup) {
  const t = docLang.value === 'zh' ? g.introZh : g.introEn
  return t ?? ''
}

function rowDesc(row: ElTokenRow) {
  return docLang.value === 'zh' ? row.descZh : row.descEn
}

function designSpec(row: ElTokenRow) {
  if (row.kind !== 'color') return undefined
  return getElColorDesignSpec(row.name)
}

function specLabel(row: ElTokenRow): string {
  const s = designSpec(row)
  if (!s) return ''
  return docLang.value === 'zh' ? s.figmaRefZh : s.figmaRefEn
}

async function copyName(name: string) {
  try {
    await navigator.clipboard.writeText(name)
    ElMessage.success(docLang.value === 'zh' ? '已复制变量名' : 'Copied token name')
  } catch {
    ElMessage.error(docLang.value === 'zh' ? '复制失败' : 'Copy failed')
  }
}

function showColorSwatch(row: ElTokenRow): boolean {
  if (row.kind !== 'color') return false
  const v = resolved.value[row.name] ?? ''
  if (!v || v === '—') return false
  return /^(#|rgb|hsla?\()/i.test(v)
}

function colorSwatchStyle(row: ElTokenRow): Record<string, string> {
  const v = resolved.value[row.name] ?? ''
  return { backgroundColor: v }
}

const colToken = computed(() => (docLang.value === 'zh' ? '变量名（Element）' : 'Token (Element)'))
const colValue = computed(() => (docLang.value === 'zh' ? '色值（设计规范）' : 'Value (design spec)'))
const colDesc = computed(() => (docLang.value === 'zh' ? '说明' : 'Description'))
const colAction = computed(() => (docLang.value === 'zh' ? '复制' : 'Copy'))
</script>

<template>
  <div class="ds-ep ds-el-token-doc ds-doc-page">
    <p class="ds-ep__lead ds-el-token-doc__lead">
      <template v-if="docLang === 'zh'">
        表格布局参考
        <a
          class="ds-ep__figma-link"
          href="https://arco.design/react/docs/token"
          target="_blank"
          rel="noopener noreferrer"
        >Arco Design Token 文档</a>
        ；变量名仍为 Element Plus 官方
        <code>--el-*</code>（
        <a
          class="ds-ep__figma-link"
          href="https://element-plus.org/zh-CN/guide/theming.html"
          target="_blank"
          rel="noopener noreferrer"
        >主题</a>
        ）。<strong>亮色主题下，颜色类 token 已在应用启动时注入为侧栏「颜色」中的 Figma
        规范 HEX</strong>（并同步
        <code>*-rgb</code> 供组件混色）；表中色值为当前文档站实际计算结果。暗色主题仍使用 Element 官方暗色档，与稿分离时可再扩展映射。
      </template>
      <template v-else>
        Layout inspired by
        <a
          class="ds-ep__figma-link"
          href="https://arco.design/react/docs/token"
          target="_blank"
          rel="noopener noreferrer"
        >Arco tokens</a>
        ; names are Element
        <code>--el-*</code>.
        <strong>In light theme, color tokens are injected at startup from the Figma palette</strong>
        (including
        <code>*-rgb</code> for mixes). The table shows computed values on this site. Dark theme still uses Element’s dark scale unless you extend the map.
      </template>
    </p>

    <DsDocSample
      title-zh="亮色主题如何对齐色板"
      title-en="Light theme & palette"
      intro-zh="与「颜色」页同源：启动时注入 --el-*，下表为当前文档站计算值。"
      intro-en="Same mapping as the Color page; values below are computed on this site."
      hide-preview
      :code="TOKENS_INJECT_SNIPPET"
    />

    <div class="ds-el-token-doc__callout">
      <strong v-if="docLang === 'zh'">说明</strong>
      <strong v-else>Note</strong>
      <template v-if="docLang === 'zh'">
        Element 主色的 light-3～light-9 与 Figma Primary 1～7 命名不同，注入表按<strong>语义档位</strong>与稿对齐。业务项目可复制
        <code>inject-element-plus-design-theme.ts</code> 的思路，或改为在 SCSS 中写死各档。文档壳层另有
        <code>--ds-*</code>，见 <code>design-system.css</code>。
      </template>
      <template v-else>
        El primary light steps don’t match Figma numbering 1:1; injection maps by intent. Reuse
        <code>inject-element-plus-design-theme.ts</code> or override in SCSS for pixel-perfect control.
      </template>
    </div>

    <section
      v-for="g in groups"
      :key="g.id"
      class="ds-el-token-doc__section"
      :aria-labelledby="`ds-el-token-${g.id}`"
    >
      <h2 :id="`ds-el-token-${g.id}`" class="ds-el-token-doc__section-title">
        {{ sectionTitle(g) }}
      </h2>
      <p v-if="sectionIntro(g)" class="ds-el-token-doc__section-intro">{{ sectionIntro(g) }}</p>

      <div class="ds-el-token-table" role="table" :aria-label="sectionTitle(g)">
        <div class="ds-el-token-table__head" role="row">
          <div role="columnheader">{{ colToken }}</div>
          <div role="columnheader">{{ colValue }}</div>
          <div role="columnheader">{{ colDesc }}</div>
          <div role="columnheader" class="ds-el-token-table__col-action">{{ colAction }}</div>
        </div>
        <div
          v-for="row in g.rows"
          :key="`${g.id}-${row.name}`"
          class="ds-el-token-table__row"
          role="row"
        >
          <div role="cell" class="ds-el-token-table__name">
            <code>{{ row.name }}</code>
          </div>

          <div role="cell" class="ds-el-token-table__value-cell">
            <template v-if="row.kind === 'color'">
              <div class="ds-el-token-table__spec-row">
                <span
                  v-if="showColorSwatch(row)"
                  class="ds-el-token-table__swatch"
                  :style="colorSwatchStyle(row)"
                  aria-hidden="true"
                />
                <code class="ds-el-token-table__value-text">{{ resolved[row.name] ?? '—' }}</code>
              </div>
              <template v-if="designSpec(row)">
                <div v-if="designSpec(row)!.designVar" class="ds-el-token-table__spec-meta">
                  <code>{{ designSpec(row)!.designVar }}</code>
                </div>
                <div class="ds-el-token-table__spec-meta">{{ specLabel(row) }}</div>
              </template>
            </template>
            <template v-else>
              <code class="ds-el-token-table__value-text">{{ resolved[row.name] ?? '—' }}</code>
            </template>
          </div>

          <div role="cell" class="ds-el-token-table__desc">
            {{ rowDesc(row) }}
          </div>

          <div role="cell" class="ds-el-token-table__action">
            <el-button type="primary" link @click="copyName(row.name)">
              {{ docLang === 'zh' ? '复制变量名' : 'Copy name' }}
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
