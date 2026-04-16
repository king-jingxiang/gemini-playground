import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/gemini-playground/', // GitHub Pages 部署路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
