import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    port:3006,
    proxy:{
      '/api':
      {
        target:'http://api:9000',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,""),  
      }
    }
  }
})
