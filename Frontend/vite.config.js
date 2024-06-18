import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches the directory specified in vercel.json
    emptyOutDir: true, // Clean output directory before each build
    manifest: true, // Generate manifest.json for PWA support if needed
    rollupOptions: {
      input: {
        main: './index.html', // Entry point of your application
      },
    },
  },
})
