import { URL, fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { plugin as MdPlugin, Mode } from 'vite-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  // assetsInclude: ['**/*.md'],
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteMockServe({
      localEnabled: true,
      prodEnabled: true,
      mockPath: 'mock',
      injectCode: `
        import { setupProdMockServer } from './plugins/mockProdServer'
        setupProdMockServer()
      `,
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dirs: ['src/stores', 'src/composables'],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
    MdPlugin({
      mode: [Mode.VUE, Mode.HTML],
    }),
  ],
  server: {
    open: true,
    proxy: {
      '/dev-api': {
        target: '',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dev-api/, ''),
      },
    },
  },
  preview: {
    open: true,
    proxy: {
      '/dev-api': {
        target: '',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dev-api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    devSourcemap: false,
  },
  build: {
    sourcemap: false,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
      },
    },
  },
})
