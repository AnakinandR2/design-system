<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import { FIGMA_OVERSEAS_COLOR_GROUPS } from '../../color-tokens/figma-overseas-colors'
import type { Lang } from '../../nav'
import DsDocSample from '../../doc/DsDocSample.vue'

const dsLangRef = inject<Ref<Lang> | undefined>('dsLang', undefined)
const docLang = computed(() => dsLangRef?.value ?? 'zh')

const groups = FIGMA_OVERSEAS_COLOR_GROUPS

function sectionTitle(zh: string, en: string) {
  return docLang.value === 'zh' ? `${zh} ${en}` : en
}

const FIGMA_URL =
  'https://www.figma.com/design/OXMz3vWSuvrhs6lcmJJS0a/%E6%B5%B7%E5%A4%96%E7%BB%BC%E5%90%88%E7%AB%99%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83%E6%B1%87%E6%80%BB?node-id=5-869'
const ARCO_TOKEN_URL = 'https://arco.design/react/docs/token'

const COLOR_CSS_SNIPPET = `:root {
  --color-primary-6: #1cb1c8;
  --color-text-1: #1a2233;
  --color-border-1: #ebeff5;
  /* 完整阶梯见下方各分组色块 */
}`
</script>

<template>
  <div class="ds-ep ds-token-doc ds-doc-page">
    <p class="ds-ep__lead ds-token-doc__lead">
      {{ docLang === 'zh' ? '色值来自 Figma' : 'Colors from Figma' }}
      <a class="ds-token-doc__a" :href="FIGMA_URL" target="_blank" rel="noopener noreferrer">
        {{ docLang === 'zh' ? '《海外综合站设计规范汇总》· 生成色彩规范' : 'Overseas design spec · Color tokens' }}
      </a>
      <template v-if="docLang === 'zh'">
        。下表为设计稿色值与建议变量名，供实现与验收对照；本站壳层仍使用文档站默认蓝灰主题，不随下表自动改色。版式参考
      </template>
      <template v-else>
        . Swatches below are spec reference; the doc shell keeps the default blue-gray theme. Layout:
      </template>
      <a class="ds-token-doc__a" :href="ARCO_TOKEN_URL" target="_blank" rel="noopener noreferrer">Arco Design Token</a>
      <template v-if="docLang === 'zh'"> 文档的信息结构。</template>
      <template v-else> docs.</template>
    </p>

    <p class="ds-token-doc__stats" aria-hidden="true">
      {{ docLang === 'zh' ? '共' : '' }} {{ groups.length }} {{ docLang === 'zh' ? '个分组 ·' : 'groups ·' }}
      {{ groups.reduce((n, g) => n + g.tokens.length, 0) }}
      {{ docLang === 'zh' ? '枚色块' : 'swatches' }}
    </p>

    <DsDocSample
      title-zh="在 CSS 中引用建议变量名"
      title-en="Suggested CSS variables"
      intro-zh="下表每枚色块均标注 --color-*；业务可与 Tailwind / 主题文件对齐。"
      intro-en="Each swatch lists a suggested --color-* name for your app theme."
      hide-preview
      :code="COLOR_CSS_SNIPPET"
    />

    <section
      v-for="g in groups"
      :key="g.id"
      class="ds-token-section"
      :aria-labelledby="`ds-token-${g.id}`"
    >
      <header class="ds-token-section__head">
        <h2 :id="`ds-token-${g.id}`" class="ds-token-section__title">
          {{ sectionTitle(g.titleZh, g.titleEn) }}
        </h2>
        <p v-if="g.intro" class="ds-token-section__intro">{{ g.intro }}</p>
      </header>

      <div class="ds-token-grid" role="list">
        <div
          v-for="(t, i) in g.tokens"
          :key="`${g.id}-${i}-${t.hex}`"
          class="ds-token-card"
          role="listitem"
        >
          <div class="ds-token-card__swatch" :style="{ backgroundColor: t.hex }" aria-hidden="true" />
          <div class="ds-token-card__body">
            <div class="ds-token-card__name">{{ t.name }}</div>
            <div class="ds-token-card__hex">{{ t.hex.toUpperCase() }}</div>
            <div v-if="t.cssVar" class="ds-token-card__var">{{ t.cssVar }}</div>
            <div v-if="t.desc" class="ds-token-card__desc">{{ t.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="ds-token-doc__callout">
      <div class="ds-token-doc__callout-title">
        {{ docLang === 'zh' ? '与壳层变量的对应' : 'Mapping to shell tokens' }}
      </div>
      <p class="ds-token-doc__callout-body">
        <span v-if="docLang === 'zh'">
          业务实现时可按上表将色值映射到项目 CSS 变量（如 <code>--color-primary-6</code>）。本站文档壳层使用 <code>--ds-*</code> 等，与上表为两套体系：需要产品色时再在业务里接入 Figma 规范。
        </span>
        <span v-else>
          Map these tokens in product CSS as needed. The doc shell uses <code>--ds-*</code>; it is separate from the Figma table above.
        </span>
      </p>
    </div>
  </div>
</template>
