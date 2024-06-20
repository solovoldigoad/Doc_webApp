import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api' : 'doc-web-app-backend.vercel.app',
      changeOrigin: true,
        secure: false,
    }
    },
  build: {
    outDir: 'dist', // Ensure the build output is in the dist directory
  }
})
