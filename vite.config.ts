import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
/** GitHub Pages 项目站：https://<用户>.github.io/<仓库名>/ — 仓库为 AnakinandR2/design-system 时用 /design-system/ */
export default defineConfig({
  base: '/design-system/',
  plugins: [vue()],
})
