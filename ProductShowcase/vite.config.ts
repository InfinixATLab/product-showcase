import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/product-showcase/',
  server: {
    watch: {
      usePolling: true,
    },
    port: 5173,
    host: true,
  },
  plugins: [
    react(),
  ],
})