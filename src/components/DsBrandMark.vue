<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 显示边长（px） */
    size?: number
  }>(),
  { size: 28 },
)

const src = `${import.meta.env.BASE_URL}banana-logo.svg`
</script>

<template>
  <img
    class="ds-brand-mark"
    :src="src"
    :width="size"
    :height="size"
    alt=""
    decoding="async"
    draggable="false"
  />
</template>

<style scoped>
.ds-brand-mark {
  display: block;
  flex-shrink: 0;
  object-fit: contain;
}
</style>
