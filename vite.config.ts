import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` keeps asset paths relative, so the build works on Vercel,
// Netlify, a custom domain or a GitHub Pages sub-path without changes.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
