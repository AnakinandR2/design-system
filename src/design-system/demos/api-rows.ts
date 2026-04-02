export interface ApiRow {
  prop: string
  desc: string
  type: string
  default: string
}

/** 与侧栏 id 对齐；未列出的条目在文档区隐藏 API 表 */
export const apiRowsByNavId: Record<string, ApiRow[]> = {
  button: [
    { prop: 'size', desc: '尺寸', type: "'large' | 'default' | 'small'", default: '-' },
    { prop: 'type', desc: '类型（color 优先）', type: 'enum', default: '-' },
    { prop: 'plain', desc: '朴素按钮', type: 'boolean', default: 'false' },
    { prop: 'text', desc: '文字按钮', type: 'boolean', default: 'false' },
    { prop: 'bg', desc: '文字按钮背景', type: 'boolean', default: 'false' },
    { prop: 'link', desc: '链接样式', type: 'boolean', default: 'false' },
    { prop: 'round', desc: '圆角', type: 'boolean', default: 'false' },
    { prop: 'circle', desc: '圆形', type: 'boolean', default: 'false' },
    { prop: 'dashed', desc: '虚线边框', type: 'boolean', default: 'false' },
    { prop: 'loading', desc: '加载中', type: 'boolean', default: 'false' },
    { prop: 'loading-icon', desc: '加载图标', type: 'string / Component', default: 'Loading' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
    { prop: 'icon', desc: '图标', type: 'string / Component', default: '-' },
    { prop: 'native-type', desc: '原生 type', type: 'enum', default: "'button'" },
    { prop: 'tag', desc: '渲染标签', type: 'string / Component', default: "'button'" },
  ],
  input: [
    { prop: 'modelValue / v-model', desc: '绑定值', type: 'string', default: '-' },
    { prop: 'type', desc: '类型', type: 'string', default: "'text'" },
    { prop: 'placeholder', desc: '占位', type: 'string', default: '-' },
    { prop: 'clearable', desc: '可清空', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
    { prop: 'show-password', desc: '显示密码切换', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: 'enum', default: '-' },
  ],
  select: [
    { prop: 'modelValue / v-model', desc: '绑定值', type: 'string | number | array', default: '-' },
    { prop: 'multiple', desc: '多选', type: 'boolean', default: 'false' },
    { prop: 'placeholder', desc: '占位', type: 'string', default: '-' },
    { prop: 'clearable', desc: '可清空', type: 'boolean', default: 'false' },
    { prop: 'collapse-tags', desc: '折叠标签', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
  ],
  radio: [
    { prop: 'modelValue / v-model', desc: '绑定值', type: 'string | number | boolean', default: '-' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: 'enum', default: '-' },
  ],
  checkbox: [
    { prop: 'modelValue / v-model', desc: '绑定值（组为数组）', type: 'string | number | boolean | array', default: '-' },
    { prop: 'label', desc: '选中值', type: 'string | number | boolean', default: '-' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
    { prop: 'indeterminate', desc: '全选不确定态', type: 'boolean', default: 'false' },
  ],
  switch: [
    { prop: 'modelValue / v-model', desc: '绑定值', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
    { prop: 'inline-prompt', desc: '文字内嵌', type: 'boolean', default: 'false' },
  ],
  form: [
    { prop: 'model', desc: '表单数据对象', type: 'object', default: '-' },
    { prop: 'rules', desc: '校验规则', type: 'object', default: '-' },
    { prop: 'label-width', desc: '标签宽度', type: 'string | number', default: '-' },
    { prop: 'disabled', desc: '整表禁用', type: 'boolean', default: 'false' },
  ],
  tag: [
    { prop: 'type', desc: '类型', type: 'enum', default: '-' },
    { prop: 'closable', desc: '可关闭', type: 'boolean', default: 'false' },
    { prop: 'round', desc: '圆角', type: 'boolean', default: 'false' },
    { prop: 'effect', desc: '主题', type: "'dark' | 'light' | 'plain'", default: "'light'" },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
  ],
  tabs: [
    { prop: 'modelValue / v-model', desc: '当前激活 name', type: 'string | number', default: '-' },
    { prop: 'type', desc: '风格', type: "'card' | 'border-card'", default: '-' },
    { prop: 'tab-position', desc: '标签位置', type: 'enum', default: "'top'" },
  ],
  'date-picker': [
    { prop: 'modelValue / v-model', desc: '绑定日期', type: 'string | Date | array', default: '-' },
    { prop: 'type', desc: '显示类型', type: 'string', default: "'date'" },
    { prop: 'placeholder', desc: '占位', type: 'string', default: '-' },
    { prop: 'value-format', desc: '绑定值格式', type: 'string', default: '-' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
  ],
  card: [
    { prop: 'header', desc: '标题区（插槽）', type: 'string', default: '-' },
    { prop: 'shadow', desc: '阴影', type: "'always' | 'hover' | 'never'", default: "'always'" },
    { prop: 'body-style', desc: '内容区样式', type: 'object', default: '-' },
  ],
  breadcrumb: [
    { prop: 'separator', desc: '分隔符', type: 'string', default: "'/'" },
    { prop: 'separator-icon', desc: '图标分隔', type: 'string / Component', default: '-' },
  ],
  'page-header': [
    { prop: 'icon', desc: '返回图标', type: 'string / Component', default: 'Back' },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'content', desc: '内容（插槽）', type: 'string', default: '-' },
  ],
  pagination: [
    { prop: 'current-page / v-model:current-page', desc: '当前页', type: 'number', default: '1' },
    { prop: 'page-size / v-model:page-size', desc: '每页条数', type: 'number', default: '10' },
    { prop: 'total', desc: '总条数', type: 'number', default: '-' },
    { prop: 'layout', desc: '布局子项', type: 'string', default: '-' },
    { prop: 'background', desc: '背景按钮', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
  ],
  steps: [
    { prop: 'active', desc: '当前步骤（0 起）', type: 'number', default: '0' },
    { prop: 'finish-status', desc: '结束状态图标', type: 'enum', default: "'finish'" },
    { prop: 'align-center', desc: '标题描述居中', type: 'boolean', default: 'false' },
    { prop: 'simple', desc: '简洁风格', type: 'boolean', default: 'false' },
  ],
  dropdown: [
    { prop: 'trigger', desc: '触发方式', type: "'hover' | 'click' | 'contextmenu'", default: "'hover'" },
    { prop: 'placement', desc: '弹出位置', type: 'enum', default: "'bottom'" },
    { prop: 'disabled', desc: '禁用', type: 'boolean', default: 'false' },
  ],
  menu: [
    { prop: 'default-active', desc: '当前激活 index', type: 'string', default: '-' },
    { prop: 'mode', desc: '模式', type: "'horizontal' | 'vertical'", default: "'vertical'" },
    { prop: 'collapse', desc: '折叠（侧栏）', type: 'boolean', default: 'false' },
    { prop: 'router', desc: 'vue-router 模式', type: 'boolean', default: 'false' },
  ],
  navigation: [
    { prop: 'default-active', desc: '当前激活', type: 'string', default: '-' },
    { prop: 'mode', desc: 'horizontal', type: 'string', default: "'horizontal'" },
  ],
  drawer: [
    { prop: 'modelValue / v-model', desc: '是否打开', type: 'boolean', default: 'false' },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'direction', desc: '方向', type: "'rtl' | 'ltr' | 'ttb' | 'btt'", default: "'rtl'" },
    { prop: 'size', desc: '宽度/高度', type: 'string | number', default: "'30%'" },
  ],
  modal: [
    { prop: 'modelValue / v-model', desc: '是否可见', type: 'boolean', default: 'false' },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'width', desc: '宽度', type: 'string | number', default: "'50%'" },
    { prop: 'destroy-on-close', desc: '关闭时销毁', type: 'boolean', default: 'false' },
  ],
  table: [
    { prop: 'data', desc: '表格数据', type: 'array', default: '[]' },
    { prop: 'stripe', desc: '斑马纹', type: 'boolean', default: 'false' },
    { prop: 'border', desc: '纵向边框', type: 'boolean', default: 'false' },
    { prop: 'height', desc: '高度', type: 'string | number', default: '-' },
    { prop: 'empty-text', desc: '空数据文案', type: 'string', default: '-' },
  ],
  empty: [
    { prop: 'description', desc: '描述文字', type: 'string', default: '-' },
    { prop: 'image-size', desc: '图片大小', type: 'number', default: '-' },
  ],
  popover: [
    { prop: 'visible / v-model:visible', desc: '是否可见', type: 'boolean', default: '-' },
    { prop: 'placement', desc: '出现位置', type: 'enum', default: "'bottom'" },
    { prop: 'trigger', desc: '触发方式', type: 'enum', default: "'click'" },
    { prop: 'width', desc: '宽度', type: 'string | number', default: '-' },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
  ],
  progress: [
    { prop: 'percentage', desc: '百分比', type: 'number', default: '0' },
    { prop: 'type', desc: '类型', type: "'line' | 'circle' | 'dashboard'", default: "'line'" },
    { prop: 'color', desc: '进度条颜色', type: 'string | array | function', default: '-' },
    { prop: 'status', desc: '状态', type: 'enum', default: '-' },
  ],
  skeleton: [
    { prop: 'rows', desc: '段落行数', type: 'number', default: '3' },
    { prop: 'animated', desc: '动画', type: 'boolean', default: 'false' },
    { prop: 'loading', desc: '显示骨架', type: 'boolean', default: 'true' },
  ],
  spin: [
    { prop: 'v-loading', desc: '指令：是否加载', type: 'boolean', default: '-' },
    { prop: 'element-loading-text', desc: '指令：提示文字', type: 'string', default: '-' },
  ],
  result: [
    { prop: 'icon', desc: '图标类型', type: 'string', default: "'info'" },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'sub-title', desc: '副标题', type: 'string', default: '-' },
  ],
  watermark: [
    { prop: 'content', desc: '水印文字', type: 'string | string[]', default: '-' },
    { prop: 'font', desc: '字体样式', type: 'object', default: '-' },
    { prop: 'rotate', desc: '旋转角度', type: 'number', default: '-22' },
  ],
  alert: [
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'type', desc: '类型', type: "'success' | 'warning' | 'info' | 'error'", default: "'info'" },
    { prop: 'closable', desc: '可关闭', type: 'boolean', default: 'true' },
    { prop: 'show-icon', desc: '显示图标', type: 'boolean', default: 'false' },
    { prop: 'effect', desc: '主题', type: "'light' | 'dark'", default: "'light'" },
  ],
  message: [
    { prop: 'ElMessage(options)', desc: '全局方法', type: 'function', default: '-' },
    { prop: 'message', desc: '消息文字', type: 'string', default: '-' },
    { prop: 'type', desc: '类型', type: 'enum', default: "'info'" },
    { prop: 'duration', desc: '显示时长 ms，0 不关闭', type: 'number', default: '3000' },
  ],
  notification: [
    { prop: 'ElNotification(options)', desc: '全局方法', type: 'function', default: '-' },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'message', desc: '说明', type: 'string', default: '-' },
    { prop: 'type', desc: '类型', type: 'enum', default: '-' },
    { prop: 'duration', desc: '时长 ms', type: 'number', default: '4500' },
  ],
  popconfirm: [
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'confirm-button-text', desc: '确认按钮', type: 'string', default: '-' },
    { prop: 'cancel-button-text', desc: '取消按钮', type: 'string', default: '-' },
    { prop: 'icon', desc: '图标', type: 'string / Component', default: '-' },
    { prop: 'width', desc: '宽度', type: 'string | number', default: '-' },
  ],
}

/** 按钮页：ButtonGroup 子表 */
export const BUTTON_GROUP_API_ROWS: ApiRow[] = [
  { prop: 'size', desc: '组内按钮尺寸', type: 'enum', default: '-' },
  { prop: 'type', desc: '组内按钮类型', type: 'enum', default: '-' },
  { prop: 'direction', desc: '排列方向', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
]

export function apiRowsForNav(navId: string): ApiRow[] {
  return apiRowsByNavId[navId] ?? []
}

export function apiSubTablesForNav(navId: string): { title: string; rows: ApiRow[] }[] {
  if (navId === 'button') {
    return [{ title: 'ButtonGroup', rows: BUTTON_GROUP_API_ROWS }]
  }
  return []
}
