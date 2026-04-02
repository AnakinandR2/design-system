/**
 * 来自 Figma「海外综合站设计规范汇总」→「生成色彩规范」节点
 * https://www.figma.com/design/OXMz3vWSuvrhs6lcmJJS0a/...?node-id=5-869
 */

export interface ColorTokenItem {
  /** 展示名 */
  name: string
  /** 色值 HEX */
  hex: string
  /** 建议 CSS 变量名（文档展示，可与 design-system.css 对齐） */
  cssVar?: string
  /** 说明 */
  desc?: string
}

export interface ColorTokenGroup {
  id: string
  titleZh: string
  titleEn: string
  intro?: string
  tokens: ColorTokenItem[]
}

export const FIGMA_OVERSEAS_COLOR_GROUPS: ColorTokenGroup[] = [
  {
    id: 'primary',
    titleZh: '品牌色 · 天水碧',
    titleEn: 'Brand / Primary (Teal)',
    intro: '主色阶与浅色背景，用于主按钮、链接、高亮与品牌感知。',
    tokens: [
      { name: 'Primary-6 常规', hex: '#1CB1C8', cssVar: '--color-primary-6', desc: '默认主色' },
      { name: 'Primary-5 悬浮', hex: '#38BDD3', cssVar: '--color-primary-5', desc: 'Hover' },
      { name: 'Primary-7 点击', hex: '#159DAF', cssVar: '--color-primary-7', desc: 'Active / 按下' },
      { name: 'Primary-3 禁用', hex: '#8DDCE9', cssVar: '--color-primary-3', desc: '禁用态填充' },
      { name: 'Primary-2', hex: '#C5EFF5', cssVar: '--color-primary-2', desc: '弱强调背景' },
      { name: 'Primary-1', hex: '#EAF9FB', cssVar: '--color-primary-1', desc: '最浅主色底' },
    ],
  },
  {
    id: 'neutral',
    titleZh: '中性色',
    titleEn: 'Neutral',
    intro: '界面骨架：文字层级、边框与页面底色。',
    tokens: [
      { name: '纯黑', hex: '#000000', cssVar: '--color-neutral-10' },
      { name: '主文字', hex: '#1A2233', cssVar: '--color-text-1', desc: '标题 / 强调正文' },
      { name: '次要文字', hex: '#4A5774', cssVar: '--color-text-2' },
      { name: '占位文字', hex: '#8691A8', cssVar: '--color-text-3' },
      { name: '禁用文字', hex: '#C3CAD9', cssVar: '--color-text-4' },
      { name: '边框', hex: '#EBEFF5', cssVar: '--color-border-1' },
      { name: '背景', hex: '#F7F9FC', cssVar: '--color-bg-1', desc: '页面灰底' },
      { name: '纯白', hex: '#FFFFFF', cssVar: '--color-bg-white' },
    ],
  },
  {
    id: 'text-icon',
    titleZh: '文字 / 图标色阶',
    titleEn: 'Text & Icon scale',
    intro: '与中性色配合的细粒度文案与图标用色。',
    tokens: [
      { name: '标题文字', hex: '#1A2233', cssVar: '--color-text-heading' },
      { name: '正文文字', hex: '#34425B', cssVar: '--color-text-body' },
      { name: '次要文字', hex: '#4A5774', cssVar: '--color-text-secondary' },
      { name: '辅助文字', hex: '#62718F', cssVar: '--color-text-aux' },
      { name: '占位文字', hex: '#8691A8', cssVar: '--color-text-placeholder' },
      { name: '禁用文字', hex: '#C3CAD9', cssVar: '--color-text-disabled' },
      { name: '分割线 / 弱边框', hex: '#EBEFF5', cssVar: '--color-divider' },
      { name: '浅底', hex: '#F7F9FC', cssVar: '--color-fill-1' },
    ],
  },
  {
    id: 'bg-ui',
    titleZh: '全局灰色背景',
    titleEn: 'Background layers',
    intro: '表格行、侧栏、卡片等层级背景。',
    tokens: [
      { name: '全局背景', hex: '#F7F9FC', cssVar: '--color-bg-page' },
      { name: '悬浮背景', hex: '#F0F4FA', cssVar: '--color-bg-hover' },
      { name: '选中背景', hex: '#E8EFF8', cssVar: '--color-bg-selected' },
      { name: '深色背景', hex: '#DFE8F5', cssVar: '--color-bg-dark' },
    ],
  },
  {
    id: 'success',
    titleZh: '成功',
    titleEn: 'Success',
    tokens: [
      { name: 'Success-6', hex: '#00C292', cssVar: '--color-success-6' },
      { name: 'Success-5', hex: '#26CEA3', cssVar: '--color-success-5' },
      { name: 'Success-7', hex: '#00A479', cssVar: '--color-success-7' },
      { name: 'Success-3', hex: '#7FE3C4', cssVar: '--color-success-3' },
      { name: 'Success-2', hex: '#BFF1E1', cssVar: '--color-success-2' },
      { name: 'Success-1', hex: '#E9FAF5', cssVar: '--color-success-1' },
    ],
  },
  {
    id: 'danger',
    titleZh: '错误 / 危险',
    titleEn: 'Danger',
    tokens: [
      { name: 'Danger-6', hex: '#FF5959', cssVar: '--color-danger-6' },
      { name: 'Danger-5', hex: '#FF7373', cssVar: '--color-danger-5' },
      { name: 'Danger-7', hex: '#E64848', cssVar: '--color-danger-7' },
      { name: 'Danger-3', hex: '#FFACAC', cssVar: '--color-danger-3' },
      { name: 'Danger-2', hex: '#FFD5D5', cssVar: '--color-danger-2' },
      { name: 'Danger-1', hex: '#FFF0F0', cssVar: '--color-danger-1' },
    ],
  },
  {
    id: 'warning',
    titleZh: '警告',
    titleEn: 'Warning',
    tokens: [
      { name: 'Warning-6', hex: '#FFAA00', cssVar: '--color-warning-6' },
      { name: 'Warning-5', hex: '#FFBB26', cssVar: '--color-warning-5' },
      { name: 'Warning-7', hex: '#E69500', cssVar: '--color-warning-7' },
      { name: 'Warning-3', hex: '#FFD580', cssVar: '--color-warning-3' },
      { name: 'Warning-2', hex: '#FFEAB3', cssVar: '--color-warning-2' },
      { name: 'Warning-1', hex: '#FFF7E6', cssVar: '--color-warning-1' },
    ],
  },
  {
    id: 'info',
    titleZh: '信息',
    titleEn: 'Info',
    intro: '与主色青绿区分的信息提示蓝。',
    tokens: [
      { name: 'Info-6', hex: '#3B9CFF', cssVar: '--color-info-6' },
      { name: 'Info-5', hex: '#5BADFF', cssVar: '--color-info-5' },
      { name: 'Info-7', hex: '#2882E6', cssVar: '--color-info-7' },
      { name: 'Info-3', hex: '#9DCDFF', cssVar: '--color-info-3' },
      { name: 'Info-2', hex: '#CEE6FF', cssVar: '--color-info-2' },
      { name: 'Info-1', hex: '#EDF6FF', cssVar: '--color-info-1' },
    ],
  },
]
