/**
 * Element Plus --el-* 颜色变量 与 Figma「生成色彩规范」/ 设计系统 --color-* 的对应关系。
 * 推荐业务在主题层将 --el-* 配置为这些 HEX，与「颜色」文档一致。
 */

export interface ElColorDesignSpec {
  /** 设计规范 HEX（大写展示由 UI 决定） */
  hex: string
  /** 设计系统侧建议变量名（文档用，非 Element 运行时变量） */
  designVar?: string
  figmaRefZh: string
  figmaRefEn: string
}

/** 仅收录设计变量页中出现的颜色类 token */
export const EL_COLOR_DESIGN_SPEC: Record<string, ElColorDesignSpec> = {
  /* —— 主色阶：对齐 Figma Primary 1–7，Element 的 light/dark 档按语义就近对照 —— */
  '--el-color-primary': {
    hex: '#1CB1C8',
    designVar: '--color-primary-6',
    figmaRefZh: 'Primary-6 常规',
    figmaRefEn: 'Primary-6',
  },
  '--el-color-primary-light-3': {
    hex: '#38BDD3',
    designVar: '--color-primary-5',
    figmaRefZh: 'Primary-5 悬浮（对应 El 变浅 3 档）',
    figmaRefEn: 'Primary-5 hover → El light-3',
  },
  '--el-color-primary-light-5': {
    hex: '#8DDCE9',
    designVar: '--color-primary-3',
    figmaRefZh: 'Primary-3 禁用（对应 El 变浅 5 档）',
    figmaRefEn: 'Primary-3 disabled → El light-5',
  },
  '--el-color-primary-light-7': {
    hex: '#C5EFF5',
    designVar: '--color-primary-2',
    figmaRefZh: 'Primary-2（对应 El 变浅 7 档）',
    figmaRefEn: 'Primary-2 → El light-7',
  },
  '--el-color-primary-light-8': {
    hex: '#DDF3F7',
    designVar: '--color-primary-2',
    figmaRefZh: '介于 Primary-1～2（对齐 El light-8 浅底）',
    figmaRefEn: 'Between P-1 / P-2 for El light-8',
  },
  '--el-color-primary-light-9': {
    hex: '#EAF9FB',
    designVar: '--color-primary-1',
    figmaRefZh: 'Primary-1 最浅主色底',
    figmaRefEn: 'Primary-1',
  },
  '--el-color-primary-dark-2': {
    hex: '#159DAF',
    designVar: '--color-primary-7',
    figmaRefZh: 'Primary-7 点击',
    figmaRefEn: 'Primary-7 active',
  },

  /* —— 功能色：对齐各语义 6 档主色 —— */
  '--el-color-success': {
    hex: '#00C292',
    designVar: '--color-success-6',
    figmaRefZh: 'Success-6',
    figmaRefEn: 'Success-6',
  },
  '--el-color-warning': {
    hex: '#FFAA00',
    designVar: '--color-warning-6',
    figmaRefZh: 'Warning-6',
    figmaRefEn: 'Warning-6',
  },
  '--el-color-danger': {
    hex: '#FF5959',
    designVar: '--color-danger-6',
    figmaRefZh: 'Danger-6',
    figmaRefEn: 'Danger-6',
  },
  '--el-color-error': {
    hex: '#FF5959',
    designVar: '--color-danger-6',
    figmaRefZh: '与 Danger-6 一致（Element 单独 error 语义）',
    figmaRefEn: 'Same as Danger-6',
  },
  '--el-color-info': {
    hex: '#3B9CFF',
    designVar: '--color-info-6',
    figmaRefZh: 'Info-6',
    figmaRefEn: 'Info-6',
  },
  '--el-color-white': {
    hex: '#FFFFFF',
    designVar: '--color-bg-white',
    figmaRefZh: '纯白',
    figmaRefEn: 'White',
  },
  '--el-color-black': {
    hex: '#000000',
    designVar: '--color-neutral-10',
    figmaRefZh: '纯黑',
    figmaRefEn: 'Black',
  },

  /* —— 文本：中性色 + 文字色阶 —— */
  '--el-text-color-primary': {
    hex: '#1A2233',
    designVar: '--color-text-1',
    figmaRefZh: '主文字 / 标题',
    figmaRefEn: 'Primary text',
  },
  '--el-text-color-regular': {
    hex: '#34425B',
    designVar: '--color-text-body',
    figmaRefZh: '正文文字',
    figmaRefEn: 'Body text',
  },
  '--el-text-color-secondary': {
    hex: '#4A5774',
    designVar: '--color-text-2',
    figmaRefZh: '次要文字',
    figmaRefEn: 'Secondary text',
  },
  '--el-text-color-placeholder': {
    hex: '#8691A8',
    designVar: '--color-text-3',
    figmaRefZh: '占位文字',
    figmaRefEn: 'Placeholder',
  },
  '--el-text-color-disabled': {
    hex: '#C3CAD9',
    designVar: '--color-text-4',
    figmaRefZh: '禁用文字',
    figmaRefEn: 'Disabled text',
  },

  /* —— 边框：中性边框与层级 —— */
  '--el-border-color': {
    hex: '#EBEFF5',
    designVar: '--color-border-1',
    figmaRefZh: '边框',
    figmaRefEn: 'Border',
  },
  '--el-border-color-light': {
    hex: '#EBEFF5',
    designVar: '--color-border-1',
    figmaRefZh: '与默认边框同级（规范单档）',
    figmaRefEn: 'Same as default border token',
  },
  '--el-border-color-lighter': {
    hex: '#F0F4FA',
    designVar: '--color-bg-hover',
    figmaRefZh: '悬浮背景（作浅分割）',
    figmaRefEn: 'Hover bg as light divider',
  },
  '--el-border-color-extra-light': {
    hex: '#F7F9FC',
    designVar: '--color-bg-1',
    figmaRefZh: '页面灰底 / 极浅分割',
    figmaRefEn: 'Page gray / extra-light',
  },
  '--el-border-color-dark': {
    hex: '#DFE8F5',
    designVar: '--color-bg-dark',
    figmaRefZh: '全局灰 · 深色背景档',
    figmaRefEn: 'Neutral bg dark step',
  },
  '--el-border-color-darker': {
    hex: '#C3CAD9',
    designVar: '--color-text-4',
    figmaRefZh: '禁用文字色作更深边框对照',
    figmaRefEn: 'Disabled text as darker border',
  },

  /* —— 填充：中性层级 —— */
  '--el-fill-color': {
    hex: '#F0F4FA',
    designVar: '--color-bg-hover',
    figmaRefZh: '悬浮背景',
    figmaRefEn: 'Hover fill',
  },
  '--el-fill-color-light': {
    hex: '#F7F9FC',
    designVar: '--color-fill-1',
    figmaRefZh: '浅底',
    figmaRefEn: 'Light fill',
  },
  '--el-fill-color-lighter': {
    hex: '#FAFBFD',
    designVar: '--color-bg-1',
    figmaRefZh: '接近页面灰底（略提亮）',
    figmaRefEn: 'Near page bg',
  },
  '--el-fill-color-extra-light': {
    hex: '#FFFFFF',
    designVar: '--color-bg-white',
    figmaRefZh: '纯白表面',
    figmaRefEn: 'White surface',
  },
  '--el-fill-color-dark': {
    hex: '#E8EFF8',
    designVar: '--color-bg-selected',
    figmaRefZh: '选中背景',
    figmaRefEn: 'Selected bg',
  },
  '--el-fill-color-darker': {
    hex: '#DFE8F5',
    designVar: '--color-bg-dark',
    figmaRefZh: '深色背景档',
    figmaRefEn: 'Dark fill step',
  },
  '--el-fill-color-blank': {
    hex: '#FFFFFF',
    designVar: '--color-bg-white',
    figmaRefZh: '空白填充',
    figmaRefEn: 'Blank',
  },

  /* —— 页面背景 —— */
  '--el-bg-color': {
    hex: '#FFFFFF',
    designVar: '--color-bg-white',
    figmaRefZh: '组件默认表面白',
    figmaRefEn: 'Default surface',
  },
  '--el-bg-color-page': {
    hex: '#F7F9FC',
    designVar: '--color-bg-1',
    figmaRefZh: '页面灰底',
    figmaRefEn: 'Page background',
  },
  '--el-bg-color-overlay': {
    hex: '#FFFFFF',
    designVar: '--color-bg-white',
    figmaRefZh: '弹层内容区白底',
    figmaRefEn: 'Overlay panel',
  },

  /* —— 禁用态（与设计中性 + 主色禁用档对齐） —— */
  '--el-disabled-bg-color': {
    hex: '#F7F9FC',
    designVar: '--color-bg-1',
    figmaRefZh: '页面灰底作禁用底',
    figmaRefEn: 'Page gray as disabled bg',
  },
  '--el-disabled-text-color': {
    hex: '#C3CAD9',
    designVar: '--color-text-4',
    figmaRefZh: '禁用文字',
    figmaRefEn: 'Disabled text',
  },
  '--el-disabled-border-color': {
    hex: '#EBEFF5',
    designVar: '--color-border-1',
    figmaRefZh: '边框色',
    figmaRefEn: 'Border',
  },
}

export function getElColorDesignSpec(elVarName: string): ElColorDesignSpec | undefined {
  return EL_COLOR_DESIGN_SPEC[elVarName]
}
