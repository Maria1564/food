import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axiosConfig: "/src/axiosConfig.ts",
      components: "/src/components",
      config: "/src/config",
      styles: "/src/styles",
      utils: "/src/utils",
      layout: "/src/layout",
      types: "/src/types"
    }
  }
})
