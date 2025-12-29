import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), pluginPurgeCss()],
  optimizeDeps: { exclude: ['svelte-navigator'] },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: 'assets/[hash][extname]',
        manualChunks: id => {
          if (id.includes('node_modules'))
            return 'vendor'
          else return 'index'
        }
      }
    }
  }
})
