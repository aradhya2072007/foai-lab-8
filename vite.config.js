import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hf': {
        target: 'https://router.huggingface.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/hf/, '/hf-inference'),
        timeout: 60000, // 60 seconds
        proxyTimeout: 60000,
      },
    },
  },
})
