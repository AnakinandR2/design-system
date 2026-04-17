<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import {
  ArrowDown,
  Bell,
  House,
  List,
  Plus,
  Refresh,
  Search,
  Setting,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import DsBrandMark from '../components/DsBrandMark.vue'
import { I18N, type Lang } from '../design-system/nav'
import { syncPageChromeBackground } from '../design-system/sync-page-background'

const router = useRouter()
const lang = ref<Lang>('zh')
const ui = computed(() => I18N[lang.value])
const elLocale = computed(() => (lang.value === 'zh' ? zhCn : en))
const langToggleLabel = computed(() => (lang.value === 'zh' ? 'EN' : '中文'))

/** 侧栏当前选中，对应主区视图 */
const activeMenu = ref('dashboard')
const headerSearch = ref('')

const queryForm = reactive({
  keyword: '',
  status: '' as string,
  type: '',
  owner: '',
  taskId: '',
  /** 更新时间区间，value-format 字符串元组 */
  dateRange: null as null | [string, string],
})

const demoForm = reactive({
  title: '',
  category: '',
  priority: 'normal',
  enabled: true,
  remark: '',
})

type Row = {
  id: string
  name: string
  type: string
  status: 'running' | 'paused' | 'done'
  owner: string
  updatedAt: string
}

const allRows = ref<Row[]>([
  { id: 'T-1001', name: '首页 Banner 素材同步', type: '内容', status: 'running', owner: '陈思', updatedAt: '2026-04-01 10:22' },
  { id: 'T-1002', name: '订单导出队列巡检', type: '数据', status: 'done', owner: '刘洋', updatedAt: '2026-03-31 18:05' },
  { id: 'T-1003', name: '会员等级规则灰度', type: '配置', status: 'paused', owner: '王敏', updatedAt: '2026-03-30 09:41' },
  { id: 'T-1004', name: '支付回调告警订阅', type: '集成', status: 'running', owner: '赵磊', updatedAt: '2026-03-29 16:18' },
  { id: 'T-1005', name: '设计 Token 文档校对', type: '文档', status: 'done', owner: '周琪', updatedAt: '2026-03-28 11:33' },
])

const page = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)

const createForm = reactive({
  name: '',
  type: '',
  owner: '',
})

const filteredRows = computed(() => {
  let list = allRows.value
  const k = queryForm.keyword.trim().toLowerCase()
  if (k) {
    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(k) ||
        r.id.toLowerCase().includes(k) ||
        r.owner.includes(queryForm.keyword.trim()),
    )
  }
  if (queryForm.status) {
    list = list.filter((r) => r.status === queryForm.status)
  }
  if (queryForm.type) {
    list = list.filter((r) => r.type === queryForm.type)
  }
  const ownerQ = queryForm.owner.trim()
  if (ownerQ) {
    list = list.filter((r) => r.owner.includes(ownerQ))
  }
  const idQ = queryForm.taskId.trim().toLowerCase()
  if (idQ) {
    list = list.filter((r) => r.id.toLowerCase().includes(idQ))
  }
  if (queryForm.dateRange && queryForm.dateRange.length === 2) {
    const [a, b] = queryForm.dateRange
    list = list.filter((r) => {
      const d = r.updatedAt.slice(0, 10)
      return d >= a && d <= b
    })
  }
  return list
})

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredRows.value.length)

const typeOptions = computed(() => [...new Set(allRows.value.map((r) => r.type))])

const statRunning = computed(() => allRows.value.filter((r) => r.status === 'running').length)
const statDone = computed(() => allRows.value.filter((r) => r.status === 'done').length)
const statPaused = computed(() => allRows.value.filter((r) => r.status === 'paused').length)

const breadcrumbs = computed(() => {
  const zh = lang.value === 'zh'
  const home = zh ? '首页' : 'Home'
  if (activeMenu.value === 'dashboard') {
    return [{ text: home }, { text: zh ? '仪表盘' : 'Dashboard' }]
  }
  if (activeMenu.value === 'task-list') {
    return [{ text: home }, { text: zh ? '数据管理' : 'Data' }, { text: zh ? '任务列表' : 'Tasks' }]
  }
  if (activeMenu.value === 'form-demo') {
    return [{ text: home }, { text: zh ? '数据管理' : 'Data' }, { text: zh ? '表单示例' : 'Form demo' }]
  }
  if (activeMenu.value === 'settings') {
    return [{ text: home }, { text: zh ? '系统设置' : 'Settings' }]
  }
  return [{ text: home }]
})

function statusLabel(s: Row['status']) {
  if (lang.value === 'en') {
    return s === 'running' ? 'Running' : s === 'paused' ? 'Paused' : 'Done'
  }
  return s === 'running' ? '进行中' : s === 'paused' ? '已暂停' : '已完成'
}

function statusType(s: Row['status']): 'success' | 'warning' | 'info' {
  if (s === 'done') return 'success'
  if (s === 'paused') return 'warning'
  return 'info'
}

function onMenuSelect(index: string) {
  activeMenu.value = index
  page.value = 1
}

function onSearch() {
  page.value = 1
  ElMessage.success(lang.value === 'zh' ? '已按条件筛选' : 'Filtered')
}

function onReset() {
  queryForm.keyword = ''
  queryForm.status = ''
  queryForm.type = ''
  queryForm.owner = ''
  queryForm.taskId = ''
  queryForm.dateRange = null
  page.value = 1
}

function openCreate() {
  createForm.name = ''
  createForm.type = ''
  createForm.owner = ''
  dialogVisible.value = true
}

function submitCreate() {
  if (!createForm.name.trim()) {
    ElMessage.warning(lang.value === 'zh' ? '请填写任务名称' : 'Enter a name')
    return
  }
  const id = `T-${1000 + allRows.value.length + 1}`
  allRows.value.unshift({
    id,
    name: createForm.name.trim(),
    type: createForm.type.trim() || (lang.value === 'zh' ? '未分类' : 'General'),
    status: 'running',
    owner: createForm.owner.trim() || '—',
    updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
  })
  dialogVisible.value = false
  page.value = 1
  ElMessage.success(lang.value === 'zh' ? '已创建（示例数据）' : 'Created (demo)')
}

function submitDemoForm() {
  ElMessage.success(lang.value === 'zh' ? '已提交（演示）' : 'Submitted (demo)')
}

function goHome() {
  router.push('/')
}

function initTheme() {
  try {
    const saved = localStorage.getItem('ds-theme')
    const next = saved === 'dark' || saved === 'light' ? saved : 'light'
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  } catch {
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.remove('dark')
  }
  syncPageChromeBackground()
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  document.documentElement.classList.toggle('dark', next === 'dark')
  try {
    localStorage.setItem('ds-theme', next)
  } catch {
    /* ignore */
  }
  syncPageChromeBackground()
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
    <div class="ds-dash">
      <el-container class="ds-dash__shell" direction="vertical">
        <!-- 顶栏：品牌、面包屑、搜索、语言/主题/通知/用户 -->
        <el-header class="ds-dash__header" height="56px">
          <div class="ds-dash__header-left">
            <router-link to="/" class="ds-brand ds-brand--mark-only ds-dash__brand" aria-label="首页">
              <span class="ds-brand__mark" aria-hidden="true">
                <DsBrandMark :size="34" />
              </span>
            </router-link>
            <span class="ds-dash__header-divider" aria-hidden="true" />
            <el-breadcrumb class="ds-dash__breadcrumb" separator="/">
              <el-breadcrumb-item v-for="(c, i) in breadcrumbs" :key="i">{{ c.text }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="ds-dash__header-right">
            <div class="ds-dash__nav-entries" role="navigation" aria-label="Site">
              <router-link to="/doc/quick-start" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavQuickStart }}</router-link>
              <router-link to="/doc/button" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavComponents }}</router-link>
              <router-link to="/showcase" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavShowcase }}</router-link>
              <router-link to="/doc/delivery-package" class="ds-btn ds-btn--ghost ds-topnav-entry">{{ ui.topNavResources }}</router-link>
            </div>
            <div class="ds-search ds-dash__header-search" role="search">
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
              <input
                v-model="headerSearch"
                type="search"
                class="ds-search__input"
                :placeholder="lang === 'zh' ? '搜索…' : 'Search…'"
                autocomplete="off"
              />
            </div>
            <button type="button" class="ds-btn ds-btn--ghost" @click="toggleLang">{{ langToggleLabel }}</button>
            <button type="button" class="ds-btn ds-btn--ghost ds-iconbtn" :title="ui.themeTitle" @click="toggleTheme">
              <svg class="ds-icon-theme-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <svg class="ds-icon-theme-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" hidden>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>
            <el-badge :value="3" class="ds-dash__notify">
              <el-button text class="ds-dash__icon-only" :aria-label="lang === 'zh' ? '通知' : 'Notifications'">
                <el-icon :size="18"><Bell /></el-icon>
              </el-button>
            </el-badge>
            <el-dropdown trigger="click" placement="bottom-end">
              <span class="ds-dash__user">
                <span class="ds-dash__user-avatar" aria-hidden="true">DS</span>
                <span class="ds-dash__user-name">{{ lang === 'zh' ? '演示用户' : 'Demo user' }}</span>
                <el-icon class="ds-dash__user-caret"><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>{{ lang === 'zh' ? '个人中心' : 'Profile' }}</el-dropdown-item>
                  <el-dropdown-item divided @click="goHome">{{ lang === 'zh' ? '退出到首页' : 'Back to home' }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-container class="ds-dash__body" direction="horizontal">
          <!-- 侧栏 -->
          <el-aside width="232px" class="ds-dash__aside">
            <el-scrollbar class="ds-dash__aside-scroll">
              <el-menu
                :default-active="activeMenu"
                class="ds-dash__menu"
                @select="onMenuSelect"
              >
                <el-menu-item index="dashboard">
                  <el-icon><House /></el-icon>
                  <template #title>{{ lang === 'zh' ? '仪表盘' : 'Dashboard' }}</template>
                </el-menu-item>

                <el-sub-menu index="data">
                  <template #title>
                    <el-icon><List /></el-icon>
                    <span>{{ lang === 'zh' ? '数据管理' : 'Data' }}</span>
                  </template>
                  <el-menu-item index="task-list">{{ lang === 'zh' ? '任务列表' : 'Task list' }}</el-menu-item>
                  <el-menu-item index="form-demo">{{ lang === 'zh' ? '表单示例' : 'Form demo' }}</el-menu-item>
                </el-sub-menu>

                <el-menu-item index="settings">
                  <el-icon><Setting /></el-icon>
                  <template #title>{{ lang === 'zh' ? '系统设置' : 'Settings' }}</template>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-aside>

          <!-- 主区 -->
          <el-main class="ds-dash__main">
            <!-- 仪表盘 -->
            <div v-show="activeMenu === 'dashboard'" class="ds-dash__view ds-dash__view--fill">
              <div class="ds-dash__page-head">
                <h1 class="ds-dash__page-title">{{ lang === 'zh' ? '仪表盘' : 'Dashboard' }}</h1>
                <p class="ds-dash__page-desc">
                  {{
                    lang === 'zh'
                      ? '参考 TDesign Starter 布局：顶栏 + 侧栏 + 主区；组件均为 Element Plus，样式跟设计系统 Token。'
                      : 'TDesign Starter–style shell: header, sidebar, main; Element Plus + design tokens.'
                  }}
                </p>
              </div>

              <el-row :gutter="16" class="ds-dash__stats">
                <el-col :xs="12" :sm="6">
                  <el-card shadow="never" class="ds-dash__stat-card">
                    <el-statistic :value="allRows.length" :title="lang === 'zh' ? '任务总数' : 'Total tasks'" />
                  </el-card>
                </el-col>
                <el-col :xs="12" :sm="6">
                  <el-card shadow="never" class="ds-dash__stat-card">
                    <el-statistic :value="statRunning" :title="lang === 'zh' ? '进行中' : 'Running'">
                      <template #suffix>
                        <el-tag size="small" type="info" class="ds-dash__stat-tag">Live</el-tag>
                      </template>
                    </el-statistic>
                  </el-card>
                </el-col>
                <el-col :xs="12" :sm="6">
                  <el-card shadow="never" class="ds-dash__stat-card">
                    <el-statistic :value="statDone" :title="lang === 'zh' ? '已完成' : 'Done'" />
                  </el-card>
                </el-col>
                <el-col :xs="12" :sm="6">
                  <el-card shadow="never" class="ds-dash__stat-card">
                    <el-statistic :value="statPaused" :title="lang === 'zh' ? '已暂停' : 'Paused'" />
                  </el-card>
                </el-col>
              </el-row>

              <el-card class="ds-dash__card" shadow="never">
                <template #header>
                  <span class="ds-dash__card-title">{{ lang === 'zh' ? '筛选条件' : 'Filters' }}</span>
                </template>
                <div class="ds-dash__filter-layout">
                  <div class="ds-dash__filter-fields">
                    <el-form :model="queryForm" label-position="top" class="ds-dash__form ds-dash__form--filters">
                      <el-row :gutter="16">
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '关键词' : 'Keyword'">
                            <el-input
                              v-model="queryForm.keyword"
                              clearable
                              :placeholder="lang === 'zh' ? '任务名称 / 编号 / 负责人' : 'Name, ID, or owner'"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '状态' : 'Status'">
                            <el-select v-model="queryForm.status" clearable :placeholder="lang === 'zh' ? '全部' : 'All'" style="width: 100%">
                              <el-option :label="lang === 'zh' ? '进行中' : 'Running'" value="running" />
                              <el-option :label="lang === 'zh' ? '已暂停' : 'Paused'" value="paused" />
                              <el-option :label="lang === 'zh' ? '已完成' : 'Done'" value="done" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '类型' : 'Type'">
                            <el-select v-model="queryForm.type" clearable :placeholder="lang === 'zh' ? '全部' : 'All'" style="width: 100%">
                              <el-option v-for="t in typeOptions" :key="t" :label="t" :value="t" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '负责人' : 'Owner'">
                            <el-input v-model="queryForm.owner" clearable :placeholder="lang === 'zh' ? '负责人姓名' : 'Owner name'" />
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '任务编号' : 'Task ID'">
                            <el-input v-model="queryForm.taskId" clearable placeholder="T-1001" />
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '更新时间' : 'Updated range'">
                            <el-date-picker
                              v-model="queryForm.dateRange"
                              type="daterange"
                              value-format="YYYY-MM-DD"
                              :range-separator="lang === 'zh' ? '至' : '–'"
                              :start-placeholder="lang === 'zh' ? '开始日期' : 'Start'"
                              :end-placeholder="lang === 'zh' ? '结束日期' : 'End'"
                              style="width: 100%"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="ds-dash__filter-actions">
                    <el-button type="primary" :icon="Search" @click="onSearch">{{ lang === 'zh' ? '查询' : 'Search' }}</el-button>
                    <el-button :icon="Refresh" @click="onReset">{{ lang === 'zh' ? '重置' : 'Reset' }}</el-button>
                  </div>
                </div>
              </el-card>

              <el-card class="ds-dash__card ds-dash__card--stretch" shadow="never">
                <template #header>
                  <div class="ds-dash__card-head-row">
                    <span class="ds-dash__card-title">{{ lang === 'zh' ? '任务列表' : 'Tasks' }}</span>
                    <el-button type="primary" :icon="Plus" @click="openCreate">{{ lang === 'zh' ? '新建任务' : 'New task' }}</el-button>
                  </div>
                </template>
                <div class="ds-dash__card-fill">
                  <div class="ds-dash__table-flex">
                    <el-table :data="pagedRows" stripe border class="ds-dash__table" style="width: 100%">
                      <el-table-column prop="id" :label="lang === 'zh' ? '编号' : 'ID'" width="120" />
                      <el-table-column prop="name" :label="lang === 'zh' ? '任务名称' : 'Task'" min-width="180" />
                      <el-table-column prop="type" :label="lang === 'zh' ? '类型' : 'Type'" width="88" />
                      <el-table-column prop="status" :label="lang === 'zh' ? '状态' : 'Status'" width="100">
                        <template #default="{ row }">
                          <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="owner" :label="lang === 'zh' ? '负责人' : 'Owner'" width="88" />
                      <el-table-column prop="updatedAt" :label="lang === 'zh' ? '更新时间' : 'Updated'" width="160" />
                      <el-table-column :label="lang === 'zh' ? '操作' : 'Actions'" width="128" fixed="right">
                        <template #default>
                          <el-button link type="primary" size="small">{{ lang === 'zh' ? '详情' : 'View' }}</el-button>
                          <el-button link type="primary" size="small">{{ lang === 'zh' ? '编辑' : 'Edit' }}</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="ds-dash__pager">
                    <el-pagination
                      v-model:current-page="page"
                      v-model:page-size="pageSize"
                      :page-sizes="[5, 10, 20]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total"
                      background
                    />
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 任务列表（独立页，仅表格区） -->
            <div v-show="activeMenu === 'task-list'" class="ds-dash__view ds-dash__view--fill">
              <div class="ds-dash__page-head">
                <h1 class="ds-dash__page-title">{{ lang === 'zh' ? '任务列表' : 'Task list' }}</h1>
                <p class="ds-dash__page-desc">{{ lang === 'zh' ? '列表页：筛选 + 表格 + 分页。' : 'List view: filters, table, pagination.' }}</p>
              </div>
              <el-card class="ds-dash__card" shadow="never">
                <template #header>
                  <span class="ds-dash__card-title">{{ lang === 'zh' ? '筛选条件' : 'Filters' }}</span>
                </template>
                <div class="ds-dash__filter-layout">
                  <div class="ds-dash__filter-fields">
                    <el-form :model="queryForm" label-position="top" class="ds-dash__form ds-dash__form--filters">
                      <el-row :gutter="16">
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '关键词' : 'Keyword'">
                            <el-input v-model="queryForm.keyword" clearable />
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '状态' : 'Status'">
                            <el-select v-model="queryForm.status" clearable :placeholder="lang === 'zh' ? '全部' : 'All'" style="width: 100%">
                              <el-option :label="lang === 'zh' ? '进行中' : 'Running'" value="running" />
                              <el-option :label="lang === 'zh' ? '已暂停' : 'Paused'" value="paused" />
                              <el-option :label="lang === 'zh' ? '已完成' : 'Done'" value="done" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '类型' : 'Type'">
                            <el-select v-model="queryForm.type" clearable :placeholder="lang === 'zh' ? '全部' : 'All'" style="width: 100%">
                              <el-option v-for="t in typeOptions" :key="t" :label="t" :value="t" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '负责人' : 'Owner'">
                            <el-input v-model="queryForm.owner" clearable />
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '任务编号' : 'Task ID'">
                            <el-input v-model="queryForm.taskId" clearable placeholder="T-1001" />
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                          <el-form-item :label="lang === 'zh' ? '更新时间' : 'Updated range'">
                            <el-date-picker
                              v-model="queryForm.dateRange"
                              type="daterange"
                              value-format="YYYY-MM-DD"
                              :range-separator="lang === 'zh' ? '至' : '–'"
                              :start-placeholder="lang === 'zh' ? '开始日期' : 'Start'"
                              :end-placeholder="lang === 'zh' ? '结束日期' : 'End'"
                              style="width: 100%"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="ds-dash__filter-actions">
                    <el-button type="primary" :icon="Search" @click="onSearch">{{ lang === 'zh' ? '查询' : 'Search' }}</el-button>
                    <el-button :icon="Refresh" @click="onReset">{{ lang === 'zh' ? '重置' : 'Reset' }}</el-button>
                  </div>
                </div>
              </el-card>
              <el-card class="ds-dash__card ds-dash__card--stretch" shadow="never">
                <template #header>
                  <div class="ds-dash__card-head-row">
                    <span class="ds-dash__card-title">{{ lang === 'zh' ? '全部任务' : 'All tasks' }}</span>
                    <el-button type="primary" :icon="Plus" @click="openCreate">{{ lang === 'zh' ? '新建' : 'New' }}</el-button>
                  </div>
                </template>
                <div class="ds-dash__card-fill">
                  <div class="ds-dash__table-flex">
                    <el-table :data="pagedRows" stripe border class="ds-dash__table" style="width: 100%">
                      <el-table-column prop="id" :label="lang === 'zh' ? '编号' : 'ID'" width="120" />
                      <el-table-column prop="name" :label="lang === 'zh' ? '任务名称' : 'Task'" min-width="200" />
                      <el-table-column prop="status" :label="lang === 'zh' ? '状态' : 'Status'" width="100">
                        <template #default="{ row }">
                          <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="owner" :label="lang === 'zh' ? '负责人' : 'Owner'" width="100" />
                      <el-table-column prop="updatedAt" :label="lang === 'zh' ? '更新时间' : 'Updated'" width="168" />
                    </el-table>
                  </div>
                  <div class="ds-dash__pager">
                    <el-pagination
                      v-model:current-page="page"
                      v-model:page-size="pageSize"
                      :page-sizes="[5, 10, 20]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total"
                      background
                    />
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 表单示例页 -->
            <div v-show="activeMenu === 'form-demo'" class="ds-dash__view ds-dash__view--auto">
              <div class="ds-dash__page-head">
                <h1 class="ds-dash__page-title">{{ lang === 'zh' ? '表单示例' : 'Form demo' }}</h1>
                <p class="ds-dash__page-desc">{{ lang === 'zh' ? '典型录入表单：输入、选择、开关、备注。' : 'Typical form fields for demos.' }}</p>
              </div>
              <el-card class="ds-dash__card" shadow="never">
                <template #header>
                  <span class="ds-dash__card-title">{{ lang === 'zh' ? '新建工单' : 'New ticket' }}</span>
                </template>
                <el-form :model="demoForm" label-width="100px" class="ds-dash__form ds-dash__form--labeled">
                  <el-form-item :label="lang === 'zh' ? '标题' : 'Title'" required>
                    <el-input v-model="demoForm.title" :placeholder="lang === 'zh' ? '请输入标题' : 'Title'" />
                  </el-form-item>
                  <el-form-item :label="lang === 'zh' ? '分类' : 'Category'">
                    <el-select v-model="demoForm.category" :placeholder="lang === 'zh' ? '请选择' : 'Select'" style="width: 100%; max-width: 320px">
                      <el-option :label="lang === 'zh' ? '缺陷' : 'Bug'" value="bug" />
                      <el-option :label="lang === 'zh' ? '需求' : 'Feature'" value="feature" />
                      <el-option :label="lang === 'zh' ? '咨询' : 'Question'" value="question" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="lang === 'zh' ? '优先级' : 'Priority'">
                    <el-radio-group v-model="demoForm.priority">
                      <el-radio value="low">{{ lang === 'zh' ? '低' : 'Low' }}</el-radio>
                      <el-radio value="normal">{{ lang === 'zh' ? '中' : 'Normal' }}</el-radio>
                      <el-radio value="high">{{ lang === 'zh' ? '高' : 'High' }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="lang === 'zh' ? '启用通知' : 'Notify'">
                    <el-switch v-model="demoForm.enabled" />
                  </el-form-item>
                  <el-form-item :label="lang === 'zh' ? '备注' : 'Notes'">
                    <el-input v-model="demoForm.remark" type="textarea" :rows="4" :placeholder="lang === 'zh' ? '补充说明' : 'Notes'" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitDemoForm">{{ lang === 'zh' ? '提交' : 'Submit' }}</el-button>
                    <el-button @click="Object.assign(demoForm, { title: '', category: '', priority: 'normal', enabled: true, remark: '' })">
                      {{ lang === 'zh' ? '清空' : 'Reset' }}
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>

            <!-- 设置占位 -->
            <div v-show="activeMenu === 'settings'" class="ds-dash__view ds-dash__view--auto">
              <div class="ds-dash__page-head">
                <h1 class="ds-dash__page-title">{{ lang === 'zh' ? '系统设置' : 'Settings' }}</h1>
                <p class="ds-dash__page-desc">{{ lang === 'zh' ? '占位页：可接主题、语言、通知等配置。' : 'Placeholder for preferences.' }}</p>
              </div>
              <el-card class="ds-dash__card" shadow="never">
                <el-empty :description="lang === 'zh' ? '此处为演示占位' : 'Demo placeholder'">
                  <el-button type="primary" @click="toggleTheme">{{ ui.themeTitle }}</el-button>
                </el-empty>
              </el-card>
            </div>
          </el-main>
        </el-container>
      </el-container>

      <el-dialog
        v-model="dialogVisible"
        :title="lang === 'zh' ? '新建任务' : 'New task'"
        width="480px"
        destroy-on-close
        class="ds-dash__dialog"
        align-center
      >
        <el-form :model="createForm" label-position="top">
          <el-form-item :label="lang === 'zh' ? '任务名称' : 'Name'" required>
            <el-input v-model="createForm.name" :placeholder="lang === 'zh' ? '请输入' : 'Enter name'" />
          </el-form-item>
          <el-form-item :label="lang === 'zh' ? '类型' : 'Type'">
            <el-input v-model="createForm.type" :placeholder="lang === 'zh' ? '可选' : 'Optional'" />
          </el-form-item>
          <el-form-item :label="lang === 'zh' ? '负责人' : 'Owner'">
            <el-input v-model="createForm.owner" :placeholder="lang === 'zh' ? '可选' : 'Optional'" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">{{ lang === 'zh' ? '取消' : 'Cancel' }}</el-button>
          <el-button type="primary" @click="submitCreate">{{ lang === 'zh' ? '确定' : 'OK' }}</el-button>
        </template>
      </el-dialog>
    </div>
  </el-config-provider>
</template>

<style scoped>
.ds-dash {
  min-height: 100vh;
  height: 100vh;
  background: var(--ds-main-bg);
  font-family: var(--ds-font);
  box-sizing: border-box;
}

.ds-dash__shell {
  height: 100%;
  min-height: 0;
}

.ds-dash__shell :deep(.el-container) {
  min-height: 0;
}

/* 顶栏：与 .ds-topnav 同高、同左右内边距；左侧品牌+面包屑，右侧四个全局入口+搜索与操作 */
.ds-dash__header {
  display: flex !important;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: nowrap;
  padding: 0 24px 0 20px !important;
  height: 56px !important;
  min-height: 56px !important;
  background: var(--ds-bg-surface) !important;
  border-bottom: 1px solid var(--ds-border);
  box-shadow: var(--ds-topnav-shadow);
  box-sizing: border-box;
}

.ds-dash__header-left {
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 4px;
  min-width: 0;
  flex: 1 1 0;
  overflow: hidden;
}

.ds-dash__brand {
  text-decoration: none;
  flex-shrink: 0;
}

.ds-dash__header-divider {
  width: 1px;
  height: 20px;
  background: var(--ds-border);
  margin: 0 4px 0 0;
  flex-shrink: 0;
}

.ds-dash__breadcrumb {
  min-width: 0;
  font-size: 13px;
  flex: 1 1 auto;
  overflow: hidden;
}

.ds-dash__breadcrumb :deep(.el-breadcrumb__inner) {
  color: var(--ds-text-secondary);
  font-weight: 400;
}

.ds-dash__breadcrumb :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: var(--ds-text);
  font-weight: 500;
}

.ds-dash__header-right {
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  flex-wrap: nowrap;
  flex-shrink: 0;
}

.ds-dash__nav-entries {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  flex-shrink: 0;
}

/* 与文档站 .ds-search 同宽段，避免搜索框高度/边框与 el-input 不一致 */
.ds-dash__header-search.ds-search {
  flex-shrink: 0;
  min-width: 168px;
  max-width: 240px;
}

@media (max-width: 1100px) {
  .ds-dash__header {
    flex-wrap: wrap;
    height: auto !important;
    min-height: 56px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }

  .ds-dash__header-left {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .ds-dash__header-right {
    flex: 1 1 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}

.ds-dash__notify :deep(.el-badge__content) {
  transform: translate(6px, -2px);
}

.ds-dash__icon-only {
  padding: 8px;
}

.ds-dash__user {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--ds-radius-m);
  color: var(--ds-text);
  margin-left: 4px;
}

.ds-dash__user:hover {
  background: var(--ds-nav-hover-bg);
}

.ds-dash__user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--ds-primary-light);
  color: var(--ds-primary);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ds-dash__user-name {
  font-size: 14px;
  max-width: 96px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .ds-dash__user-name {
    display: none;
  }

  .ds-dash__header-search.ds-search {
    min-width: 120px;
    max-width: min(240px, 42vw);
  }
}

.ds-dash__user-caret {
  font-size: 12px;
  color: var(--ds-text-placeholder);
}

/* 侧栏 + 主区：横向铺满，主列吃掉剩余宽度 */
.ds-dash__body {
  flex: 1;
  min-height: 0 !important;
  height: 0;
  width: 100%;
}

.ds-dash__body.is-horizontal {
  display: flex;
  flex-direction: row;
}

.ds-dash__aside {
  background: var(--ds-bg-sidenav);
  border-right: 1px solid var(--ds-border);
  overflow: hidden;
  transition: width 0.2s var(--arco-ease, ease);
  box-sizing: border-box;
}

.ds-dash__aside-scroll {
  height: 100%;
}

.ds-dash__aside-scroll :deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}

.ds-dash__menu {
  border-right: none !important;
  background: transparent !important;
  padding: 8px 0;
}

.ds-dash__menu:not(.el-menu--collapse) {
  width: 100%;
}

.ds-dash__main {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: var(--ds-main-bg);
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column;
}

.ds-dash__view {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 16px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.ds-dash__view--fill {
  overflow: hidden;
}

.ds-dash__view--auto {
  overflow-x: hidden;
  overflow-y: auto;
}

.ds-dash__page-head {
  margin-bottom: 20px;
  flex-shrink: 0;
}

.ds-dash__page-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: var(--ds-text);
}

.ds-dash__page-desc {
  margin: 0;
  font-size: 14px;
  color: var(--ds-text-secondary);
  line-height: 1.6;
}

.ds-dash__stats {
  margin-bottom: 16px;
  flex-shrink: 0;
  width: 100%;
}

.ds-dash__stats :deep(.el-row) {
  width: 100%;
}

.ds-dash__stat-card {
  border-radius: var(--ds-radius-m);
  border: 1px solid var(--ds-border);
  background: var(--ds-bg-surface);
}

.ds-dash__stat-card :deep(.el-card__body) {
  padding: 16px 20px;
}

.ds-dash__stat-tag {
  margin-left: 8px;
  vertical-align: middle;
}

.ds-dash__card {
  margin-bottom: 16px;
  border-radius: var(--ds-radius-m);
  border: 1px solid var(--ds-border);
  background: var(--ds-bg-surface);
  flex-shrink: 0;
}

.ds-dash__card:last-child {
  margin-bottom: 0;
}

.ds-dash__card--stretch {
  flex: 1 1 auto;
  min-height: 0;
  margin-bottom: 0 !important;
  display: flex;
  flex-direction: column;
}

.ds-dash__card--stretch :deep(.el-card__body) {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 !important;
}

.ds-dash__card-fill {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 20px 20px;
  box-sizing: border-box;
}

.ds-dash__table-flex {
  flex: 1 1 auto;
  min-height: 120px;
  overflow: auto;
}

.ds-dash__card :deep(.el-card__header) {
  padding: 14px 20px;
  border-bottom: 1px solid var(--ds-border);
}

.ds-dash__card :deep(.el-card__body) {
  padding: 20px;
}

.ds-dash__card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--ds-text);
}

.ds-dash__card-head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.ds-dash__filter-layout {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px 24px;
}

.ds-dash__filter-fields {
  flex: 1;
  min-width: 0;
}

.ds-dash__filter-actions {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  align-self: flex-end;
}

.ds-dash__form--filters :deep(.el-form-item) {
  margin-bottom: 0;
}

.ds-dash__form--filters :deep(.el-row) {
  row-gap: 20px;
}

.ds-dash__form--filters :deep(.el-row:not(:last-child)) {
  margin-bottom: 16px;
}

.ds-dash__form--labeled :deep(.el-form-item) {
  margin-bottom: 18px;
}

@media (max-width: 991px) {
  .ds-dash__filter-layout {
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .ds-dash__filter-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

.ds-dash__table :deep(th.el-table__cell) {
  background: var(--arco-doc-table-head, var(--ds-nav-hover-bg)) !important;
  color: var(--ds-text);
  font-weight: 600;
}

.ds-dash__pager {
  flex-shrink: 0;
  margin-top: 12px;
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
}
</style>
