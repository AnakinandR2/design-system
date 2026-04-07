<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { I18N, type Lang } from '../design-system/nav'
import { syncPageChromeBackground } from '../design-system/sync-page-background'

/** 与 Vite base 一致，GitHub Pages 子路径下也能加载 */
const heroBgUrl = `${import.meta.env.BASE_URL}welcome-hero-bg.png`

const lang = ref<Lang>('zh')
provide('dsLang', lang)

const theme = ref<'light' | 'dark'>('light')
try {
  const saved = localStorage.getItem('ds-theme')
  if (saved === 'dark' || saved === 'light') theme.value = saved
} catch {
  /* ignore */
}

const ui = computed(() => I18N[lang.value])
const elLocale = computed(() => (lang.value === 'zh' ? zhCn : en))
const langToggleLabel = computed(() => (lang.value === 'zh' ? 'EN' : '中文'))

function setHtmlTheme(next: 'light' | 'dark') {
  theme.value = next
  document.documentElement.setAttribute('data-theme', next)
  document.documentElement.classList.toggle('dark', next === 'dark')
  syncPageChromeBackground()
}

function initTheme() {
  let initial: 'light' | 'dark' = 'light'
  try {
    const saved = localStorage.getItem('ds-theme')
    if (saved === 'dark' || saved === 'light') initial = saved
  } catch {
    /* ignore */
  }
  setHtmlTheme(initial)
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  setHtmlTheme(next)
  try {
    localStorage.setItem('ds-theme', next)
  } catch {
    /* ignore */
  }
}

function toggleLang() {
  lang.value = lang.value === 'zh' ? 'en' : 'zh'
}

watch(lang, (l) => {
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'
})

onMounted(() => {
  initTheme()
  document.documentElement.lang = lang.value === 'zh' ? 'zh-CN' : 'en'
})
</script>

<template>
  <el-config-provider :locale="elLocale">
    <div class="ds-welcome">
      <div class="ds-welcome__bg" aria-hidden="true">
        <div
          class="ds-welcome__bg-photo"
          :style="{ backgroundImage: `url(${heroBgUrl})` }"
        />
        <div class="ds-welcome__bg-mesh">
          <span class="ds-welcome__blob ds-welcome__blob--a" />
          <span class="ds-welcome__blob ds-welcome__blob--b" />
          <span class="ds-welcome__blob ds-welcome__blob--c" />
          <span class="ds-welcome__blob ds-welcome__blob--d" />
        </div>
        <div class="ds-welcome__bg-scrim" />
        <!-- 遮罩之上再叠一层，否则白渐变会把底下位移几乎盖没 -->
        <div class="ds-welcome__bg-mesh ds-welcome__bg-mesh--front">
          <span class="ds-welcome__blob-f ds-welcome__blob-f--1" />
          <span class="ds-welcome__blob-f ds-welcome__blob-f--2" />
          <span class="ds-welcome__blob-f ds-welcome__blob-f--3" />
        </div>
      </div>

      <header class="ds-welcome__top ds-topnav" role="banner">
        <router-link to="/" class="ds-brand" aria-label="Design System">
          <span class="ds-brand__mark" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="12" height="12" rx="2" class="ds-brand__tile ds-brand__tile--a" />
              <rect x="18" y="2" width="12" height="12" rx="2" class="ds-brand__tile ds-brand__tile--b" />
              <rect x="2" y="18" width="12" height="12" rx="2" class="ds-brand__tile ds-brand__tile--c" />
              <path d="M18 18h12v12H18V18z" class="ds-brand__tile ds-brand__tile--d" />
            </svg>
          </span>
          <span class="ds-brand__text">{{ ui.brand }}</span>
        </router-link>

        <div class="ds-topnav__actions">
          <router-link to="/doc/quick-start" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavQuickStart }}</router-link>
          <router-link to="/doc/button" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavComponents }}</router-link>
          <router-link to="/showcase" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavShowcase }}</router-link>
          <router-link to="/doc/delivery-package" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavResources }}</router-link>
          <div class="ds-search" role="search">
            <svg
              class="ds-search__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <input type="search" class="ds-search__input" placeholder="" autocomplete="off" />
          </div>

          <button type="button" class="ds-btn ds-btn--ghost" aria-label="切换语言" @click="toggleLang">
            {{ langToggleLabel }}
          </button>

          <button
            type="button"
            class="ds-btn ds-btn--ghost ds-iconbtn"
            aria-label="切换主题"
            :title="ui.themeTitle"
            @click="toggleTheme"
          >
            <svg class="ds-icon-theme-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
            <svg class="ds-icon-theme-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" hidden>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>

          <button type="button" class="ds-btn ds-btn--primary">{{ ui.login }}</button>
        </div>
      </header>

      <main class="ds-welcome__main" role="main">
        <div class="ds-welcome__center">
          <div class="ds-welcome__hero">
            <h1 class="ds-welcome__headline">
              <span class="ds-welcome__headline-line1">{{ ui.welcomeHeadline1 }}</span>
              <span class="ds-welcome__headline-line2">{{ ui.welcomeHeadline2 }}</span>
            </h1>
            <p class="ds-welcome__byline">
              <span class="ds-welcome__byline-tag" aria-hidden="true">#</span>
              {{ ui.welcomeByline }}
            </p>
            <div class="ds-welcome__cta-row">
              <router-link to="/doc/quick-start" class="ds-welcome__btn ds-welcome__btn--primary">
                <span class="ds-welcome__btn-prompt" aria-hidden="true">&gt;_</span>
                {{ ui.welcomeBtnStart }}
              </router-link>
              <router-link to="/showcase" class="ds-welcome__btn ds-welcome__btn--white">{{ ui.welcomeBtnShowcase }}</router-link>
              <router-link to="/doc/delivery-package" class="ds-welcome__btn ds-welcome__btn--white">{{ ui.welcomeBtnResources }}</router-link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </el-config-provider>
</template>

<style scoped>
/* fixed 铺满视口，避免整页出现纵向滚动条 */
.ds-welcome {
  position: fixed;
  inset: 0;
  z-index: 1;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  font-family: var(--ds-font);
  overflow: hidden;
  box-sizing: border-box;
  background: var(--ds-main-bg);
}

/* 全屏底图 + 弥散色块动效（近似 mesh gradient） */
.ds-welcome__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.ds-welcome__bg-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center 38%;
  background-repeat: no-repeat;
  transform: scale(1.02);
}

:root[data-theme='light'] .ds-welcome__bg-photo {
  opacity: 0.92;
}

:root[data-theme='dark'] .ds-welcome__bg-photo {
  opacity: 0.35;
  filter: saturate(0.85) brightness(0.55);
}

.ds-welcome__bg-mesh {
  position: absolute;
  inset: -15%;
  overflow: hidden;
  z-index: 1;
}

.ds-welcome__bg-mesh--front {
  z-index: 3;
  inset: -20%;
  opacity: 1;
  pointer-events: none;
}

.ds-welcome__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(56px);
  opacity: 0.62;
  mix-blend-mode: normal;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

:root[data-theme='dark'] .ds-welcome__blob {
  mix-blend-mode: screen;
  opacity: 0.45;
  filter: blur(64px);
}

/* 前景光斑：叠在 scrim 上，动效肉眼可见 */
.ds-welcome__blob-f {
  position: absolute;
  border-radius: 50%;
  filter: blur(48px);
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  mix-blend-mode: soft-light;
  opacity: 0.85;
}

:root[data-theme='dark'] .ds-welcome__blob-f {
  mix-blend-mode: screen;
  opacity: 0.5;
  filter: blur(56px);
}

.ds-welcome__blob-f--1 {
  width: min(70vw, 640px);
  height: min(70vw, 640px);
  top: 28%;
  left: 10%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.9) 0%, rgba(59, 130, 246, 0.2) 55%, transparent 70%);
  animation: welcome-blob-f1 9s ease-in-out infinite;
}

.ds-welcome__blob-f--2 {
  width: min(65vw, 600px);
  height: min(65vw, 600px);
  top: 32%;
  right: 8%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.85) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 68%);
  animation: welcome-blob-f2 11s ease-in-out infinite;
}

.ds-welcome__blob-f--3 {
  width: min(72vw, 660px);
  height: min(72vw, 660px);
  top: 44%;
  left: 36%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.75) 0%, rgba(37, 99, 235, 0.3) 45%, transparent 65%);
  animation: welcome-blob-f3 10s ease-in-out infinite;
}

.ds-welcome__blob--a {
  width: min(55vw, 520px);
  height: min(55vw, 520px);
  top: 10%;
  left: 12%;
  background: radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.95), rgba(59, 130, 246, 0.45));
  animation: welcome-blob-a 12s ease-in-out infinite;
}

.ds-welcome__blob--b {
  width: min(48vw, 480px);
  height: min(48vw, 480px);
  top: 22%;
  right: 10%;
  background: radial-gradient(circle at 70% 40%, rgba(147, 197, 253, 0.9), rgba(99, 102, 241, 0.35));
  animation: welcome-blob-b 14s ease-in-out infinite;
}

.ds-welcome__blob--c {
  width: min(58vw, 540px);
  height: min(58vw, 540px);
  top: 40%;
  left: 18%;
  background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.75), rgba(14, 165, 233, 0.3));
  animation: welcome-blob-c 13s ease-in-out infinite;
}

.ds-welcome__blob--d {
  width: min(44vw, 420px);
  height: min(44vw, 420px);
  top: 46%;
  right: 14%;
  background: radial-gradient(circle at 40% 60%, rgba(253, 186, 116, 0.55), rgba(196, 181, 253, 0.4));
  animation: welcome-blob-d 15s ease-in-out infinite;
}

@keyframes welcome-blob-a {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  33% {
    transform: translate3d(5vw, 3vh, 0) scale(1.1);
  }
  66% {
    transform: translate3d(-4vw, 5vh, 0) scale(0.94);
  }
}

@keyframes welcome-blob-b {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  40% {
    transform: translate3d(-6vw, 4vh, 0) scale(1.08);
  }
  70% {
    transform: translate3d(5vw, -3vh, 0) scale(0.92);
  }
}

@keyframes welcome-blob-c {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  45% {
    transform: translate3d(5vw, -5vh, 0) scale(1.1);
  }
  75% {
    transform: translate3d(-5vw, 3vh, 0) scale(0.9);
  }
}

@keyframes welcome-blob-d {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  35% {
    transform: translate3d(-5vw, -4vh, 0) scale(1.06);
  }
  65% {
    transform: translate3d(5vw, 4vh, 0) scale(0.94);
  }
}

@keyframes welcome-blob-f1 {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.75;
  }
  50% {
    transform: translate3d(6vw, 4vh, 0) scale(1.12);
    opacity: 1;
  }
}

@keyframes welcome-blob-f2 {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-7vw, 4vh, 0) scale(1.1);
  }
}

@keyframes welcome-blob-f3 {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.7;
  }
  45% {
    transform: translate3d(4vw, -4vh, 0) scale(1.12);
    opacity: 0.95;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ds-welcome__blob,
  .ds-welcome__blob-f {
    animation: none !important;
  }
}

.ds-welcome__bg-scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  /* 拉长过渡，避免出现一条明显的水平分界带 */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.1) 38%,
    rgba(255, 255, 255, 0.2) 68%,
    rgba(242, 243, 245, 0.55) 88%,
    rgba(242, 243, 245, 0.78) 100%
  );
}

:root[data-theme='dark'] .ds-welcome__bg-scrim {
  background: linear-gradient(
    180deg,
    rgba(23, 23, 26, 0.32) 0%,
    rgba(23, 23, 26, 0.5) 45%,
    rgba(23, 23, 26, 0.72) 78%,
    rgba(23, 23, 26, 0.88) 100%
  );
}

/* 去掉文档站 .ds-topnav 的 border-bottom + box-shadow（顶栏下那条细横线） */
.ds-welcome__top.ds-topnav {
  position: relative;
  flex-shrink: 0;
  z-index: 10;
  border-bottom: none !important;
  box-shadow: none !important;
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

:root[data-theme='dark'] .ds-welcome__top.ds-topnav {
  background: rgba(23, 23, 26, 0.78) !important;
}

.ds-welcome__main {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 8px 16px 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.ds-welcome__center {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-200px);
}

.ds-welcome__hero {
  text-align: center;
  max-width: 920px;
  padding: 0 8px;
}

.ds-welcome__headline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0 0 clamp(14px, 2.5vh, 24px);
  font-size: clamp(34px, 6.5vw, 58px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.ds-welcome__headline-line1 {
  color: var(--ds-primary);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

.ds-welcome__headline-line2 {
  color: var(--ds-text);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.45);
}

:root[data-theme='dark'] .ds-welcome__headline-line1,
:root[data-theme='dark'] .ds-welcome__headline-line2 {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
}

.ds-welcome__byline {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 clamp(22px, 3.5vh, 36px);
  font-size: clamp(16px, 2.1vw, 19px);
  color: var(--ds-text-secondary);
}

.ds-welcome__byline-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;
  font-weight: 500;
  color: var(--ds-text-placeholder);
}

:root[data-theme='dark'] .ds-welcome__byline-tag {
  background: rgba(255, 255, 255, 0.08);
}

.ds-welcome__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.ds-welcome__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s,
    transform 0.15s;
}

.ds-welcome__btn--primary {
  background: var(--ds-primary);
  color: #fff;
  border-color: var(--ds-primary);
}

.ds-welcome__btn--primary:hover {
  background: var(--ds-primary-hover);
  border-color: var(--ds-primary-hover);
  color: #fff;
}

.ds-welcome__btn-prompt {
  font-family: ui-monospace, 'Cascadia Code', consolas, monospace;
  font-size: 17px;
  opacity: 0.95;
}

.ds-welcome__btn--white {
  background: rgba(255, 255, 255, 0.94);
  border-color: var(--ds-border);
  color: var(--ds-text);
}

.ds-welcome__btn--white:hover {
  border-color: var(--ds-primary);
  color: var(--ds-primary);
  background: #fff;
}

:root[data-theme='dark'] .ds-welcome__btn--white {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--ds-border);
  color: var(--ds-text);
}

:root[data-theme='dark'] .ds-welcome__btn--white:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--ds-primary-hover);
}
</style>
