<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import type { Lang } from '../nav'
import { DOC_CHAPTER, type DocChapterKind } from './doc-chapters'

const props = defineProps<{
  kind: DocChapterKind
}>()

const dsLangRef = inject<Ref<Lang> | undefined>('dsLang', undefined)
const lang = computed(() => dsLangRef?.value ?? 'zh')

const text = computed(() => {
  const k = DOC_CHAPTER[props.kind]
  return lang.value === 'zh' ? k.titleZh : k.titleEn
})
</script>

<template>
  <div class="ds-doc-chapter">
    <h2 class="ds-doc-chapter__title">{{ text }}</h2>
  </div>
</template>
