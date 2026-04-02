export type Lang = 'zh' | 'en'

export const I18N = {
  zh: {
    brand: 'design system',
    login: '登录',
    docApi: 'API',
    apiColProp: '参数',
    apiColDesc: '说明',
    apiColType: '类型',
    apiColDefault: '默认值',
    codeToggle: '展开或收起示例代码',
    themeTitle: '亮暗模式',
    topNavDelivery: '交付包下载',
  },
  en: {
    brand: 'design system',
    login: 'Log in',
    docApi: 'API',
    apiColProp: 'Prop',
    apiColDesc: 'Description',
    apiColType: 'Type',
    apiColDefault: 'Default',
    codeToggle: 'Expand or collapse code',
    themeTitle: 'Theme',
    topNavDelivery: 'Delivery package',
  },
} as const

export interface NavLeaf {
  id: string
  labels: { zh: string; en: string }
}

export interface NavSubgroup {
  id: string
  labels: { zh: string; en: string }
  children: NavLeaf[]
}

/** 顶部手风琴：开发指南为平铺；组件下再分子组（对齐 Arco 文档侧栏结构） */
export type NavSection =
  | { id: string; labels: { zh: string; en: string }; kind: 'flat'; children: NavLeaf[] }
  | { id: string; labels: { zh: string; en: string }; kind: 'grouped'; subgroups: NavSubgroup[] }

const G_LEAVES = {
  quickStart: { id: 'quick-start', labels: { zh: '快速上手', en: 'Quick start' } },
  color: { id: 'color', labels: { zh: '颜色', en: 'Color' } },
  tokens: { id: 'design-tokens', labels: { zh: '设计变量', en: 'Design tokens' } },
  deliveryPackage: { id: 'delivery-package', labels: { zh: '交付包下载', en: 'Delivery package' } },
  button: { id: 'button', labels: { zh: '按钮', en: 'Button' } },
  card: { id: 'card', labels: { zh: '卡片', en: 'Card' } },
  empty: { id: 'empty', labels: { zh: '空状态', en: 'Empty' } },
  popover: { id: 'popover', labels: { zh: '气泡', en: 'Popover' } },
  table: { id: 'table', labels: { zh: '表格', en: 'Table' } },
  tabs: { id: 'tabs', labels: { zh: '标签页', en: 'Tabs' } },
  tag: { id: 'tag', labels: { zh: '标签', en: 'Tag' } },
  input: { id: 'input', labels: { zh: '输入框', en: 'Input' } },
  checkbox: { id: 'checkbox', labels: { zh: '复选框', en: 'Checkbox' } },
  radio: { id: 'radio', labels: { zh: '单选框', en: 'Radio' } },
  form: { id: 'form', labels: { zh: '表单', en: 'Form' } },
  datePicker: { id: 'date-picker', labels: { zh: '日期选择器', en: 'DatePicker' } },
  select: { id: 'select', labels: { zh: '选择器', en: 'Select' } },
  switch: { id: 'switch', labels: { zh: '开关', en: 'Switch' } },
  alert: { id: 'alert', labels: { zh: '警告提示', en: 'Alert' } },
  drawer: { id: 'drawer', labels: { zh: '抽屉', en: 'Drawer' } },
  message: { id: 'message', labels: { zh: '全局提示', en: 'Message' } },
  modal: { id: 'modal', labels: { zh: '对话框', en: 'Modal' } },
  notification: { id: 'notification', labels: { zh: '通知提醒框', en: 'Notification' } },
  popconfirm: { id: 'popconfirm', labels: { zh: '气泡确认框', en: 'Popconfirm' } },
  progress: { id: 'progress', labels: { zh: '进度条', en: 'Progress' } },
  result: { id: 'result', labels: { zh: '结果页', en: 'Result' } },
  spin: { id: 'spin', labels: { zh: '加载中', en: 'Spin' } },
  skeleton: { id: 'skeleton', labels: { zh: '骨架屏', en: 'Skeleton' } },
  watermark: { id: 'watermark', labels: { zh: '水印', en: 'Watermark' } },
  navigation: { id: 'navigation', labels: { zh: '导航', en: 'Navigation' } },
  breadcrumb: { id: 'breadcrumb', labels: { zh: '面包屑', en: 'Breadcrumb' } },
  dropdown: { id: 'dropdown', labels: { zh: '下拉菜单', en: 'Dropdown' } },
  menu: { id: 'menu', labels: { zh: '菜单', en: 'Menu' } },
  pageHeader: { id: 'page-header', labels: { zh: '页头', en: 'PageHeader' } },
  pagination: { id: 'pagination', labels: { zh: '分页', en: 'Pagination' } },
  steps: { id: 'steps', labels: { zh: '步骤条', en: 'Steps' } },
} as const satisfies Record<string, NavLeaf>

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'guide',
    labels: { zh: '开发指南', en: 'Developer guide' },
    kind: 'flat',
    children: [G_LEAVES.quickStart, G_LEAVES.color, G_LEAVES.tokens],
  },
  {
    id: 'components',
    labels: { zh: '组件', en: 'Components' },
    kind: 'grouped',
    subgroups: [
      {
        id: 'general',
        labels: { zh: '通用', en: 'General' },
        children: [
          G_LEAVES.button,
          G_LEAVES.input,
          G_LEAVES.select,
          G_LEAVES.radio,
          G_LEAVES.checkbox,
          G_LEAVES.switch,
          G_LEAVES.form,
          G_LEAVES.tag,
          G_LEAVES.tabs,
          G_LEAVES.datePicker,
        ],
      },
      {
        id: 'layout',
        labels: { zh: '布局', en: 'Layout' },
        children: [
          G_LEAVES.card,
          G_LEAVES.navigation,
          G_LEAVES.breadcrumb,
          G_LEAVES.pageHeader,
          G_LEAVES.pagination,
          G_LEAVES.steps,
          G_LEAVES.dropdown,
          G_LEAVES.menu,
          G_LEAVES.drawer,
          G_LEAVES.modal,
        ],
      },
      {
        id: 'data',
        labels: { zh: '数据展示', en: 'Data display' },
        children: [
          G_LEAVES.table,
          G_LEAVES.empty,
          G_LEAVES.popover,
          G_LEAVES.progress,
          G_LEAVES.skeleton,
          G_LEAVES.spin,
          G_LEAVES.result,
          G_LEAVES.watermark,
        ],
      },
      {
        id: 'feedback',
        labels: { zh: '反馈', en: 'Feedback' },
        children: [G_LEAVES.alert, G_LEAVES.message, G_LEAVES.notification, G_LEAVES.popconfirm],
      },
    ],
  },
  {
    id: 'delivery',
    labels: { zh: '交付包下载', en: 'Delivery package' },
    kind: 'flat',
    children: [G_LEAVES.deliveryPackage],
  },
]

export function findLeaf(navId: string): NavLeaf | undefined {
  for (const s of NAV_SECTIONS) {
    if (s.kind === 'flat') {
      const hit = s.children.find((c) => c.id === navId)
      if (hit) return hit
    } else {
      for (const sub of s.subgroups) {
        const hit = sub.children.find((c) => c.id === navId)
        if (hit) return hit
      }
    }
  }
  return undefined
}

/** Arco 文档式：中文站为「中文 + 英文组件名」同行 */
export function navLine(leaf: NavLeaf, lang: Lang): string {
  if (lang === 'zh') return `${leaf.labels.zh} ${leaf.labels.en}`
  return leaf.labels.en
}

export function titleForNavId(navId: string, lang: Lang): string {
  const leaf = findLeaf(navId)
  if (leaf) return navLine(leaf, lang)
  return navId
}
