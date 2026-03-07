import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const asyncCssPlugin = () => ({
  name: 'async-css-plugin',
  transformIndexHtml(html) {
    return html.replace(/<link\b[^>]*>/gi, (tag) => {
      const isStylesheet = /\brel=(['"])stylesheet\1/i.test(tag)
      const hrefMatch = tag.match(/\bhref=(['"])([^'"]+\.css(?:\?[^'"]*)?)\1/i)

      if (!isStylesheet || !hrefMatch) {
        return tag
      }

      const href = hrefMatch[2]
      return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n<noscript><link rel="stylesheet" href="${href}"></noscript>`
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    ...(mode === 'development' ? [vueDevTools()] : []),
    ...(mode !== 'development' ? [asyncCssPlugin()] : []),
    tailwindcss(),
  ],
  build: {
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
    },
  },
}))
