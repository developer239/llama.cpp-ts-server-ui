/* eslint-disable import/no-default-export */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
  ],
})
