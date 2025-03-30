import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), pluginPurgeCss()],
  optimizeDeps: { exclude: ['svelte-navigator'] }
})
