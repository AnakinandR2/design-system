/**
 * 单文件离线包：JS/CSS 打进 index.html，base 为相对路径。
 * 路由必须使用 Hash（#/path），否则 file:// 下无法区分页面。
 * 构建产物：dist-offline/index.html — 可拷贝到 U 盘双击尝试打开（见下方限制）。
 */
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
  ],
  base: './',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'dist-offline',
    emptyOutDir: true,
  },
})
