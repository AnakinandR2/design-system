<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {
  ArrowDown,
  Bell,
  Coin,
  Connection,
  DataBoard,
  Document,
  InfoFilled,
  Link as LinkIcon,
  Monitor,
  Postcard,
  PriceTag,
  Search,
  Setting,
  Share,
  Wallet,
} from '@element-plus/icons-vue'

import '../assets/glory-cloud-reference.css'
import { syncPageChromeBackground } from '../design-system/sync-page-background'

const router = useRouter()

const topSeg = ref('use')
const subTab = ref('user-mgmt')
const searchText = ref('')
const page = ref(1)
const pageSize = ref(100)

const tableData = ref([
  { username: '(Main User)', password: '********', traffic: '0.00 GB / Unlimited', remarks: '—', isMain: true },
  { username: 'sub_user_01', password: '********', traffic: '12.40 GB / 50 GB', remarks: 'Team A', isMain: false },
  { username: 'sub_user_02', password: '********', traffic: '3.20 GB / 20 GB', remarks: '', isMain: false },
  { username: 'sub_user_03', password: '********', traffic: '0.50 GB / 10 GB', remarks: 'Test', isMain: false },
])

function goDocs() {
  router.push('/')
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

onMounted(() => {
  syncPageChromeBackground()
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="gc-ref gc-ref--showcase">
      <div class="ds-showcase-chrome">
        <span class="ds-showcase-chrome__label">设计系统 · 视觉样例页（Element Plus + 全局 Token，布局参考 GloryCloud 仪表盘）</span>
        <div class="ds-showcase-chrome__actions">
          <el-button text type="primary" @click="goDocs">返回组件文档</el-button>
          <el-button text @click="toggleTheme">切换亮暗</el-button>
        </div>
      </div>

      <el-container class="gc-ref__shell" direction="vertical">
        <el-header class="gc-ref__header" height="56px">
          <div class="gc-ref__brand">
            <span class="gc-ref__brand-mark" aria-hidden="true" />
            <span>GloryCloud</span>
          </div>

          <el-breadcrumb class="gc-ref__breadcrumb" separator="/">
            <el-breadcrumb-item>
              <a href="#/" class="gc-ref__crumb-link" @click.prevent="goDocs">Overview</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>Residential Proxies</el-breadcrumb-item>
          </el-breadcrumb>

          <div class="gc-ref__header-right">
            <span class="gc-ref__balance">
              <el-icon><Coin /></el-icon>
              $ 59.00
            </span>
            <el-badge :value="99" :max="99" class="gc-ref__badge">
              <el-icon class="gc-ref__header-icon"><Bell /></el-icon>
            </el-badge>
            <el-icon class="gc-ref__header-icon"><Postcard /></el-icon>
            <el-dropdown trigger="click">
              <span class="gc-ref__user-trigger">
                1082083802
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>账户设置</el-dropdown-item>
                  <el-dropdown-item divided>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-container class="gc-ref__body">
          <el-aside width="272px" class="gc-ref__aside">
            <el-menu
              default-active="residential"
              class="gc-ref__aside-menu"
              :default-openeds="['proxies', 'rotating']"
              :router="false"
            >
              <el-menu-item index="overview">
                <el-icon><DataBoard /></el-icon>
                <span>Overview</span>
              </el-menu-item>
              <el-menu-item index="plans">
                <el-icon><PriceTag /></el-icon>
                <span>Plans &amp; Pricing</span>
              </el-menu-item>

              <el-sub-menu index="proxies">
                <template #title>
                  <el-icon><Connection /></el-icon>
                  <span>Proxies</span>
                </template>
                <el-sub-menu index="rotating">
                  <template #title>Rotating Proxies</template>
                  <el-menu-item index="residential">
                    <span>Residential Proxies</span>
                  </el-menu-item>
                  <el-menu-item index="mobile">Mobile Proxies</el-menu-item>
                  <el-menu-item index="datacenter">Datacenter Proxies</el-menu-item>
                  <el-menu-item index="unlimited">Unlimited Residential Proxies</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="static">
                  <template #title>Static Proxies</template>
                  <el-menu-item index="static-a">IPv4</el-menu-item>
                  <el-menu-item index="static-b">IPv6</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>

              <el-sub-menu index="scraping">
                <template #title>
                  <el-icon><Document /></el-icon>
                  <span>Scraping</span>
                </template>
                <el-menu-item index="serp">SERP API</el-menu-item>
                <el-menu-item index="web-scrape">Web Scraping API</el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="general">
                <template #title>
                  <el-icon><Setting /></el-icon>
                  <span>General</span>
                </template>
                <el-menu-item index="wallet">
                  <el-icon><Wallet /></el-icon>
                  <span>Wallet</span>
                </el-menu-item>
                <el-menu-item index="tx">Transaction</el-menu-item>
                <el-menu-item index="affiliate">
                  <el-icon><Share /></el-icon>
                  <span>Affiliate Program</span>
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-aside>

          <el-main class="gc-ref__main">
            <div class="gc-ref__main-inner">
              <h1 class="gc-ref__title">Residential Proxies</h1>

              <el-radio-group v-model="topSeg" size="large" class="gc-ref__seg">
                <el-radio-button label="use">Proxy use</el-radio-button>
                <el-radio-button label="plans">My Plans</el-radio-button>
                <el-radio-button label="traffic">Traffic Usage</el-radio-button>
              </el-radio-group>

              <div class="gc-ref__banner">
                <div class="gc-ref__banner-text">
                  <span>
                    <el-icon style="vertical-align: middle; margin-right: 4px"><Monitor /></el-icon>
                    Residential Proxies: Total traffic: <strong>317.00 GB</strong>
                  </span>
                  <span>Available traffic: <strong>42.00 GB</strong></span>
                </div>
                <el-button type="primary" size="large">Buy more</el-button>
              </div>

              <el-tabs v-model="subTab" class="gc-ref__subtabs gc-ref__subtabs--lg">
                <el-tab-pane label="User-Pass Authentication" name="user-pass" />
                <el-tab-pane label="IP Whitelist Authentication" name="ip-white-auth" />
                <el-tab-pane label="Username Management" name="user-mgmt" />
                <el-tab-pane label="IP Whitelist Management" name="ip-white-mgmt" />
                <el-tab-pane name="guide">
                  <template #label>
                    <span class="gc-ref__tab-ext">
                      Parameter Input Guide
                      <el-icon><LinkIcon /></el-icon>
                    </span>
                  </template>
                </el-tab-pane>
              </el-tabs>

              <div class="gc-ref__toolbar">
                <div class="gc-ref__toolbar-left">
                  <el-button type="primary" plain size="large">Create sub-user</el-button>
                  <el-button text bg size="large">Record of operations</el-button>
                </div>
                <el-input v-model="searchText" class="gc-ref__search" size="large" placeholder="Search username" clearable>
                  <template #append>
                    <el-button type="primary" size="large" :icon="Search">Search</el-button>
                  </template>
                </el-input>
              </div>

              <el-table class="gc-ref__table" size="large" :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="username" label="Username" min-width="200" />
                <el-table-column prop="password" label="Password" width="140" />
                <el-table-column prop="traffic" min-width="240">
                  <template #header>
                    <span>Traffic used/limit</span>
                    <el-tooltip content="已用流量 / 套餐上限" placement="top">
                      <el-icon style="margin-left: 4px; vertical-align: middle; cursor: help">
                        <InfoFilled />
                      </el-icon>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" label="Remarks" min-width="160" />
                <el-table-column label="Actions" width="168" fixed="right">
                  <template #default="{ row }">
                    <div class="gc-ref__actions">
                      <span class="gc-ref__link">Edit</span>
                      <span v-if="!row.isMain" class="gc-ref__link">Delete</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div class="gc-ref__footer">
                <el-pagination
                  v-model:current-page="page"
                  v-model:page-size="pageSize"
                  size="large"
                  :page-sizes="[10, 20, 50, 100]"
                  layout="prev, pager, next, sizes, jumper"
                  :total="1980"
                  background
                />
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<style scoped>
.gc-ref__badge :deep(.el-badge__content) {
  transform: translate(8px, -4px);
}

.gc-ref__tab-ext {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
