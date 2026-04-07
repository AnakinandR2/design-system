import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
/** 本地 dev 用 `/`，直接打开 http://localhost:5173/#/ 即可；build 仍用 `/design-system/` 以适配 GitHub Pages 项目站 */
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/design-system/',
  plugins: [vue()],
}))
