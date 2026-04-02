/**
 * 设计变量文档数据：命名严格遵循 Element Plus 主题变量（--el-*）
 * 参考：https://element-plus.org/zh-CN/guide/theming.html
 */

export type ElTokenKind = 'color' | 'dimension' | 'shadow' | 'font' | 'other'

export interface ElTokenRow {
  /** 完整 CSS 变量名，如 --el-color-primary */
  name: string
  kind: ElTokenKind
  descZh: string
  descEn: string
}

export interface ElTokenGroup {
  id: string
  titleZh: string
  titleEn: string
  introZh?: string
  introEn?: string
  rows: ElTokenRow[]
}

export const ELEMENT_PLUS_TOKEN_GROUPS: ElTokenGroup[] = [
  {
    id: 'color-primary',
    titleZh: '主色阶',
    titleEn: 'Primary color scale',
    introZh:
      '与 type="primary" 组件及品牌色相关。亮色下已由应用注入为侧栏「颜色」天水碧主色阶对应 HEX。',
    introEn:
      'Primary actions. In light theme, values are injected from the Figma teal scale on the Color page.',
    rows: [
      { name: '--el-color-primary', kind: 'color', descZh: '主色', descEn: 'Primary' },
      { name: '--el-color-primary-light-3', kind: 'color', descZh: '主色变浅 3 档', descEn: 'Primary light 3' },
      { name: '--el-color-primary-light-5', kind: 'color', descZh: '主色变浅 5 档', descEn: 'Primary light 5' },
      { name: '--el-color-primary-light-7', kind: 'color', descZh: '主色变浅 7 档', descEn: 'Primary light 7' },
      { name: '--el-color-primary-light-8', kind: 'color', descZh: '主色变浅 8 档', descEn: 'Primary light 8' },
      { name: '--el-color-primary-light-9', kind: 'color', descZh: '主色变浅 9 档', descEn: 'Primary light 9' },
      { name: '--el-color-primary-dark-2', kind: 'color', descZh: '主色加深 2 档', descEn: 'Primary dark 2' },
    ],
  },
  {
    id: 'color-semantic',
    titleZh: '功能色',
    titleEn: 'Semantic colors',
    introZh:
      '基础色已注入为 Figma Success / Warning / Danger / Info 的 6 档主色；error 与 danger 同色。各语义色的 light/dark 子档仍由 Element 组件侧混色，可按需在 SCSS 覆盖。',
    introEn:
      'Base semantic colors are injected from Figma “-6” tokens; error equals danger. Lighter/darker steps for tags etc. still use Element mix unless overridden in SCSS.',
    rows: [
      { name: '--el-color-success', kind: 'color', descZh: '成功', descEn: 'Success' },
      { name: '--el-color-warning', kind: 'color', descZh: '警告', descEn: 'Warning' },
      { name: '--el-color-danger', kind: 'color', descZh: '危险', descEn: 'Danger' },
      { name: '--el-color-error', kind: 'color', descZh: '错误（与 danger 并行）', descEn: 'Error' },
      { name: '--el-color-info', kind: 'color', descZh: '信息', descEn: 'Info' },
      { name: '--el-color-white', kind: 'color', descZh: '白', descEn: 'White' },
      { name: '--el-color-black', kind: 'color', descZh: '黑', descEn: 'Black' },
    ],
  },
  {
    id: 'text',
    titleZh: '文本色',
    titleEn: 'Text colors',
    introZh: '亮色下已注入为 Figma 中性色 / 文字色阶（主文、正文、次要、占位、禁用）。',
    introEn: 'Injected from Figma neutral & text scale in light theme.',
    rows: [
      { name: '--el-text-color-primary', kind: 'color', descZh: '主要正文', descEn: 'Primary text' },
      { name: '--el-text-color-regular', kind: 'color', descZh: '常规正文', descEn: 'Regular text' },
      { name: '--el-text-color-secondary', kind: 'color', descZh: '次要文字', descEn: 'Secondary text' },
      { name: '--el-text-color-placeholder', kind: 'color', descZh: '占位符', descEn: 'Placeholder' },
      { name: '--el-text-color-disabled', kind: 'color', descZh: '禁用文字', descEn: 'Disabled text' },
    ],
  },
  {
    id: 'border',
    titleZh: '边框色',
    titleEn: 'Border colors',
    introZh: '规范单档边框为 #EBEFF5；多档 --el-border-* 已按语义映射并注入。',
    introEn: 'Base border #EBEFF5 in spec; --el-border-* ladder injected per Figma neutrals.',
    rows: [
      { name: '--el-border-color', kind: 'color', descZh: '默认边框', descEn: 'Default border' },
      { name: '--el-border-color-light', kind: 'color', descZh: '浅边框', descEn: 'Light' },
      { name: '--el-border-color-lighter', kind: 'color', descZh: '更浅', descEn: 'Lighter' },
      { name: '--el-border-color-extra-light', kind: 'color', descZh: '极浅', descEn: 'Extra light' },
      { name: '--el-border-color-dark', kind: 'color', descZh: '深边框', descEn: 'Dark' },
      { name: '--el-border-color-darker', kind: 'color', descZh: '更深', descEn: 'Darker' },
      { name: '--el-border-width', kind: 'dimension', descZh: '线宽', descEn: 'Border width' },
      { name: '--el-border-style', kind: 'other', descZh: '线型', descEn: 'Border style' },
    ],
  },
  {
    id: 'fill',
    titleZh: '填充色',
    titleEn: 'Fill colors',
    introZh: '已注入为 Figma 全局灰背景、选中、悬浮等层级对应的填充色。',
    introEn: 'Injected from Figma gray / hover / selected fill layers.',
    rows: [
      { name: '--el-fill-color', kind: 'color', descZh: '默认填充', descEn: 'Default fill' },
      { name: '--el-fill-color-light', kind: 'color', descZh: '浅填充', descEn: 'Light fill' },
      { name: '--el-fill-color-lighter', kind: 'color', descZh: '更浅', descEn: 'Lighter' },
      { name: '--el-fill-color-extra-light', kind: 'color', descZh: '极浅', descEn: 'Extra light' },
      { name: '--el-fill-color-dark', kind: 'color', descZh: '深填充', descEn: 'Dark fill' },
      { name: '--el-fill-color-darker', kind: 'color', descZh: '更深', descEn: 'Darker' },
      { name: '--el-fill-color-blank', kind: 'color', descZh: '空白（常为白）', descEn: 'Blank' },
    ],
  },
  {
    id: 'bg',
    titleZh: '背景色',
    titleEn: 'Background',
    introZh: '已注入：页面 #F7F9FC，组件默认表面纯白。',
    introEn: 'Injected: page #F7F9FC, default surfaces white.',
    rows: [
      { name: '--el-bg-color', kind: 'color', descZh: '默认背景', descEn: 'Default bg' },
      { name: '--el-bg-color-page', kind: 'color', descZh: '页面级背景', descEn: 'Page bg' },
      { name: '--el-bg-color-overlay', kind: 'color', descZh: '遮罩上层面板背景', descEn: 'Overlay surface' },
    ],
  },
  {
    id: 'radius',
    titleZh: '圆角',
    titleEn: 'Border radius',
    rows: [
      { name: '--el-border-radius-base', kind: 'dimension', descZh: '基础圆角', descEn: 'Base radius' },
      { name: '--el-border-radius-small', kind: 'dimension', descZh: '小圆角', descEn: 'Small' },
      { name: '--el-border-radius-round', kind: 'dimension', descZh: '大圆角（胶囊）', descEn: 'Round' },
      { name: '--el-border-radius-circle', kind: 'dimension', descZh: '圆形', descEn: 'Circle' },
    ],
  },
  {
    id: 'font',
    titleZh: '字号',
    titleEn: 'Font size',
    rows: [
      { name: '--el-font-size-extra-large', kind: 'font', descZh: '超大', descEn: 'Extra large' },
      { name: '--el-font-size-large', kind: 'font', descZh: '大', descEn: 'Large' },
      { name: '--el-font-size-medium', kind: 'font', descZh: '中', descEn: 'Medium' },
      { name: '--el-font-size-base', kind: 'font', descZh: '基础', descEn: 'Base' },
      { name: '--el-font-size-small', kind: 'font', descZh: '小', descEn: 'Small' },
      { name: '--el-font-size-extra-small', kind: 'font', descZh: '超小', descEn: 'Extra small' },
      { name: '--el-font-weight-primary', kind: 'font', descZh: '主字重', descEn: 'Primary weight' },
      { name: '--el-font-line-height-primary', kind: 'font', descZh: '主行高', descEn: 'Primary line height' },
    ],
  },
  {
    id: 'shadow',
    titleZh: '阴影',
    titleEn: 'Box shadow',
    rows: [
      { name: '--el-box-shadow', kind: 'shadow', descZh: '默认阴影', descEn: 'Default' },
      { name: '--el-box-shadow-light', kind: 'shadow', descZh: '浅阴影', descEn: 'Light' },
      { name: '--el-box-shadow-lighter', kind: 'shadow', descZh: '更浅', descEn: 'Lighter' },
      { name: '--el-box-shadow-dark', kind: 'shadow', descZh: '深阴影', descEn: 'Dark' },
    ],
  },
  {
    id: 'disabled',
    titleZh: '禁用态',
    titleEn: 'Disabled',
    introZh: '已注入，与中性灰底、禁用字色、边框色一致。',
    introEn: 'Injected; aligned to neutral disabled / border tokens.',
    rows: [
      { name: '--el-disabled-bg-color', kind: 'color', descZh: '禁用背景', descEn: 'Disabled bg' },
      { name: '--el-disabled-text-color', kind: 'color', descZh: '禁用文字', descEn: 'Disabled text' },
      { name: '--el-disabled-border-color', kind: 'color', descZh: '禁用边框', descEn: 'Disabled border' },
    ],
  },
  {
    id: 'size',
    titleZh: '组件尺寸',
    titleEn: 'Component size',
    introZh: '与 large / default / small 三档高度相关。',
    introEn: 'Heights for large / default / small sizes.',
    rows: [
      { name: '--el-component-size-large', kind: 'dimension', descZh: '大号高度', descEn: 'Large' },
      { name: '--el-component-size', kind: 'dimension', descZh: '默认高度（Element 对 default 档不设 -default 后缀）', descEn: 'Default height (no -default suffix)' },
      { name: '--el-component-size-small', kind: 'dimension', descZh: '小号高度', descEn: 'Small' },
    ],
  },
  {
    id: 'z-index',
    titleZh: '层级',
    titleEn: 'Z-index',
    rows: [
      { name: '--el-index-normal', kind: 'other', descZh: '普通', descEn: 'Normal' },
      { name: '--el-index-top', kind: 'other', descZh: '顶部', descEn: 'Top' },
      { name: '--el-index-popper', kind: 'other', descZh: '弹出层（下拉等）', descEn: 'Popper' },
    ],
  },
  {
    id: 'transition',
    titleZh: '过渡',
    titleEn: 'Transition',
    rows: [
      { name: '--el-transition-duration', kind: 'other', descZh: '默认时长', descEn: 'Default duration' },
      { name: '--el-transition-duration-fast', kind: 'other', descZh: '快速时长', descEn: 'Fast duration' },
      { name: '--el-transition-function-ease-in-out-bezier', kind: 'other', descZh: '标准缓动曲线', descEn: 'Ease-in-out bezier' },
      { name: '--el-transition-function-fast-bezier', kind: 'other', descZh: '快速缓动曲线', descEn: 'Fast bezier' },
      { name: '--el-transition-all', kind: 'other', descZh: 'transition: all …', descEn: 'Shorthand all' },
      { name: '--el-transition-fade', kind: 'other', descZh: '淡入淡出', descEn: 'Fade' },
      { name: '--el-transition-border', kind: 'other', descZh: '边框色过渡', descEn: 'Border transition' },
    ],
  },
]

/** 扁平化所有变量名，用于一次性读取 getComputedStyle */
export function allElTokenNames(): string[] {
  const set = new Set<string>()
  for (const g of ELEMENT_PLUS_TOKEN_GROUPS) {
    for (const r of g.rows) set.add(r.name)
  }
  return [...set]
}
