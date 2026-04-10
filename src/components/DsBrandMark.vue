<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 显示边长（px） */
    size?: number
  }>(),
  { size: 34 },
)

const base = import.meta.env.BASE_URL
/** 浅色顶栏 / 浅色界面：官方「浅色底」彩色标 */
const srcForLightUi = `${base}logo-light-bg.svg`
/** 深色模式：官方「深色底」反白标 */
const srcForDarkUi = `${base}logo-dark-bg.svg`
</script>

<template>
  <span class="ds-brand-mark" :style="{ width: `${size}px`, height: `${size}px` }">
    <img
      class="ds-brand-mark__img ds-brand-mark__img--light-ui"
      :src="srcForLightUi"
      alt=""
      decoding="async"
      draggable="false"
    />
    <img
      class="ds-brand-mark__img ds-brand-mark__img--dark-ui"
      :src="srcForDarkUi"
      alt=""
      decoding="async"
      draggable="false"
    />
  </span>
</template>

<style scoped>
.ds-brand-mark {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ds-brand-mark__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ds-brand-mark__img--dark-ui {
  display: none;
}
</style>

<style>
/* 与 html[data-theme] 同步：暗色界面只显示反白稿 */
html[data-theme='dark'] .ds-brand-mark .ds-brand-mark__img--light-ui {
  display: none;
}

html[data-theme='dark'] .ds-brand-mark .ds-brand-mark__img--dark-ui {
  display: block;
}
</style>
