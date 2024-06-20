import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
  proxy: {
    '/api' : 'doc-web-app-backend.vercel.app',
    changeOrigin: true,
        secure: false,
  }
  },
  build: {
    outDir: 'dist',
     // Ensure the build output is in the dist directory
  }
})
