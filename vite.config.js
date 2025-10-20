import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['parse']
  },
  build: {
    commonjsOptions: {
      include: [/parse/, /node_modules/]
    }
  },
  resolve: {
    alias: {
      'events': 'events',
      'util': 'util',
      'stream': 'stream-browserify',
      'buffer': 'buffer',
      'process': 'process/browser'
    }
  }
})
