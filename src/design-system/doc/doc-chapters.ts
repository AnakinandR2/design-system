/** 与 Element 文档站接近的章节标题（中英） */
export type DocChapterKind = 'usage' | 'styles' | 'states'

export const DOC_CHAPTER: Record<
  DocChapterKind,
  { titleZh: string; titleEn: string }
> = {
  usage: { titleZh: '组件用法', titleEn: 'Usage' },
  styles: { titleZh: '组件样式', titleEn: 'Styles' },
  states: { titleZh: '组件状态', titleEn: 'States' },
}
