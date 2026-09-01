import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { chatProxyPlugin } from './server.ts'

export default defineConfig({
  plugins: [tailwindcss(), react(), chatProxyPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
