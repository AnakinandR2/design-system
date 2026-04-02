import { EL_COLOR_DESIGN_SPEC } from '../tokens/element-el-to-design-spec'

function hexToRgbComma(hex: string): string {
  const raw = hex.trim().replace(/^#/, '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `${r}, ${g}, ${b}`
}

const EL_SEMANTIC_RGB_VARS = [
  '--el-color-primary',
  '--el-color-success',
  '--el-color-warning',
  '--el-color-danger',
  '--el-color-error',
  '--el-color-info',
] as const

/** 将 Figma / 设计系统色值写入 :root 的 --el-*，覆盖 Element Plus 默认（亮色）；暗色仍由 html.dark 的 css-vars 接管 */
export function injectElementPlusDesignTheme(): void {
  if (typeof document === 'undefined') return

  const chunks: string[] = []
  for (const [name, spec] of Object.entries(EL_COLOR_DESIGN_SPEC)) {
    chunks.push(`${name}:${spec.hex};`)
  }
  for (const name of EL_SEMANTIC_RGB_VARS) {
    const hex = EL_COLOR_DESIGN_SPEC[name]?.hex
    if (hex) chunks.push(`${name}-rgb:${hexToRgbComma(hex)};`)
  }

  const el = document.createElement('style')
  el.setAttribute('data-ds', 'element-plus-figma-theme')
  el.textContent = `:root{${chunks.join('')}}`
  document.head.appendChild(el)
}
