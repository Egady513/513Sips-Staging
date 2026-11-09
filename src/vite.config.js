import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/513sips-tools/',
  build: {
    outDir: '../website',
    emptyOutDir: true,
  },
})