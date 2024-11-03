import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      config: "/src/config",
      styles: "/src/styles",
      utils: "/src/utils",
      layout: "/src/layout",
      types: "/src/types"
    }
  }
})
