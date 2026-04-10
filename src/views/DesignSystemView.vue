<script setup lang="ts">
import { computed, nextTick, onMounted, provide, reactive, ref, watch } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useRoute, useRouter } from 'vue-router'
import { I18N, NAV_SECTIONS, type Lang, navLine, titleForNavId } from '../design-system/nav'
import { apiRowsForNav, apiSubTablesForNav } from '../design-system/demos/api-rows'
import DsBrandMark from '../components/DsBrandMark.vue'
import { demoByNavId, getDemoForNavId } from '../design-system/demos/registry'
import { syncPageChromeBackground } from '../design-system/sync-page-background'

const lang = ref<Lang>('zh')
provide('dsLang', lang)
/** 与 localStorage / document 同步，用于主内容区内联背景（优先级高于任意外链 CSS） */
const theme = ref<'light' | 'dark'>('light')
try {
  const saved = localStorage.getItem('ds-theme')
  if (saved === 'dark' || saved === 'light') theme.value = saved
} catch {
  /* ignore */
}

const router = useRouter()
const route = useRoute()
const activeNavId = ref('button')
const navCollapsed = ref(false)

/** 从路由 path 解析文档 id（顶栏 router-link 跳转时未必触发 hashchange，需跟 route 同步） */
function readNavIdFromDocPath(path: string): string | null {
  const m = path.match(/^\/doc\/([^/?#]+)/)
  const id = m?.[1]
  return id && id in demoByNavId ? id : null
}

function syncNavFromRoute() {
  const id = readNavIdFromDocPath(route.path)
  if (id) activeNavId.value = id
}

/** 主内容区滚回顶部（滚动容器为 .ds-main） */
function scrollDocMainToTop() {
  nextTick(() => {
    const el = document.querySelector('.ds-shell .ds-main') as HTMLElement | null
    if (el) el.scrollTop = 0
  })
}

const expanded = reactive<Record<string, boolean>>({
  /** 默认展开，避免「颜色」藏在折叠分组里看不到 */
  guide: true,
  components: true,
  delivery: true,
})

const ui = computed(() => I18N[lang.value])
const elLocale = computed(() => (lang.value === 'zh' ? zhCn : en))
const docTitle = computed(() => titleForNavId(activeNavId.value, lang.value))
const langToggleLabel = computed(() => (lang.value === 'zh' ? 'EN' : '中文'))
const demoComponent = computed(() => getDemoForNavId(activeNavId.value))
const apiRows = computed(() => apiRowsForNav(activeNavId.value))
const apiSubTables = computed(() => apiSubTablesForNav(activeNavId.value))

const mainContentStyle = computed(() => ({
  backgroundColor: theme.value === 'dark' ? '#17171a' : '#f2f3f5',
}))

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

function selectNav(id: string) {
  activeNavId.value = id
  router.replace({ path: `/doc/${id}` }).catch(() => {})
}

function toggleSection(id: string) {
  expanded[id] = !expanded[id]
}

watch(lang, (l) => {
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'
})

watch(
  () => route.path,
  (_path, prevPath) => {
    syncNavFromRoute()
    /* immediate 首次触发时 prevPath 为 undefined，避免在挂载前误滚 */
    if (prevPath !== undefined) scrollDocMainToTop()
  },
  { immediate: true, flush: 'post' },
)

onMounted(() => {
  initTheme()
  document.documentElement.lang = lang.value === 'zh' ? 'zh-CN' : 'en'
})
</script>

<template>
  <el-config-provider :locale="elLocale">
    <div class="ds-shell">
      <header class="ds-topnav" role="banner">
        <router-link to="/" class="ds-brand ds-brand--mark-only" aria-label="首页">
          <span class="ds-brand__mark" aria-hidden="true">
            <DsBrandMark :size="28" />
          </span>
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

      <div class="ds-body">
        <div class="ds-sidenav-wrap">
          <aside class="ds-sidenav" :class="{ 'is-collapsed': navCollapsed }" aria-label="侧栏导航">
            <div class="ds-sidenav-scroll">
              <nav class="ds-sidenav__nav">
                <div v-for="s in NAV_SECTIONS" :key="s.id" class="arco-nav-accordion">
                  <button
                    type="button"
                    class="arco-nav-accordion__head"
                    :aria-expanded="expanded[s.id]"
                    @click="toggleSection(s.id)"
                  >
                    <span class="arco-nav-accordion__label" :class="{ 'is-expanded': expanded[s.id] }">{{ s.labels[lang] }}</span>
                    <svg
                      class="arco-nav-accordion__chevron"
                      :class="{ 'is-open': expanded[s.id] }"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>

                  <div v-show="expanded[s.id]" class="arco-nav-accordion__body">
                    <template v-if="s.kind === 'flat'">
                      <ul class="arco-nav-list">
                        <li v-for="c in s.children" :key="c.id">
                          <button
                            type="button"
                            class="arco-nav-link"
                            :class="{ 'is-active': c.id === activeNavId }"
                            @click="selectNav(c.id)"
                          >
                            {{ navLine(c, lang) }}
                          </button>
                        </li>
                      </ul>
                    </template>
                    <template v-else>
                      <div v-for="sub in s.subgroups" :key="sub.id">
                        <div class="arco-nav-subtitle">{{ sub.labels[lang] }}</div>
                        <ul class="arco-nav-list">
                          <li v-for="c in sub.children" :key="c.id">
                            <button
                              type="button"
                              class="arco-nav-link"
                              :class="{ 'is-active': c.id === activeNavId }"
                              @click="selectNav(c.id)"
                            >
                              {{ navLine(c, lang) }}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </template>
                  </div>
                </div>
              </nav>
            </div>
          </aside>
        </div>

        <button
          v-if="!navCollapsed"
          type="button"
          class="arco-sidenav-edge"
          aria-label="收起侧栏"
          @click="navCollapsed = true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M7.5 9L4.5 6l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <button
          v-if="navCollapsed"
          type="button"
          class="arco-sidenav-expand"
          aria-label="展开侧栏"
          @click="navCollapsed = false"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4.5 3L7.5 6l-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <main class="ds-main" role="main" :style="mainContentStyle">
          <article class="ds-main__inner arco-doc">
            <header class="arco-doc__header">
              <h1 class="arco-doc__title">{{ docTitle }}</h1>
              <div class="arco-doc__intro" />
            </header>

            <component :is="demoComponent" :key="activeNavId" class="ds-demo-root" />

            <section
              v-if="apiRows.length || apiSubTables.length"
              class="arco-doc-api"
              aria-labelledby="arco-doc-api-heading"
            >
              <h2 id="arco-doc-api-heading" class="arco-doc-api__title ds-doc-api-chapter-title">{{ ui.docApi }}</h2>
              <p class="arco-doc-api__hint">
                <el-link href="https://element-plus.org/zh-CN/component/overview" target="_blank" rel="noopener noreferrer" type="info">
                  Element Plus 文档
                </el-link>
                — 完整类型、事件与插槽以官方为准。
              </p>
              <div v-if="apiRows.length" class="arco-doc-api__table-wrap">
                <table class="arco-doc-table">
                  <thead>
                    <tr>
                      <th>{{ ui.apiColProp }}</th>
                      <th>{{ ui.apiColDesc }}</th>
                      <th>{{ ui.apiColType }}</th>
                      <th>{{ ui.apiColDefault }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in apiRows" :key="row.prop">
                      <td>{{ row.prop }}</td>
                      <td>{{ row.desc }}</td>
                      <td><code class="arco-doc-api__code">{{ row.type }}</code></td>
                      <td>{{ row.default }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <template v-for="sub in apiSubTables" :key="sub.title">
                <h3 class="arco-doc-api__subtitle">{{ sub.title }}</h3>
                <div class="arco-doc-api__table-wrap">
                  <table class="arco-doc-table">
                    <thead>
                      <tr>
                        <th>{{ ui.apiColProp }}</th>
                        <th>{{ ui.apiColDesc }}</th>
                        <th>{{ ui.apiColType }}</th>
                        <th>{{ ui.apiColDefault }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in sub.rows" :key="sub.title + row.prop">
                        <td>{{ row.prop }}</td>
                        <td>{{ row.desc }}</td>
                        <td><code class="arco-doc-api__code">{{ row.type }}</code></td>
                        <td>{{ row.default }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </section>
          </article>
        </main>
      </div>
    </div>
  </el-config-provider>
</template>
