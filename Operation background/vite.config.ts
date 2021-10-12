import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
const prefix = `monaco-editor/esm/vs`
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  server: {
    host: '0.0.0.0',
  },
  base: '/yc/',
  build: {
    outDir: 'yc',
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#2970f6',
        },
        javascriptEnabled: true,
      },
    },
  },
})
