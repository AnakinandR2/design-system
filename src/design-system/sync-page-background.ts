/** 用内联 + !important 同步整页底色，避免外链 CSS 或变量未命中时仍透出灰底 */
export function syncPageChromeBackground() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const bg = isDark ? '#17171a' : '#f2f3f5'
  document.body.style.setProperty('background-color', bg, 'important')
  const app = document.getElementById('app')
  if (app) app.style.setProperty('background-color', bg, 'important')
}
