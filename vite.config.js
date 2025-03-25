import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ECommrence/', // 🚨 Case-sensitive
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})