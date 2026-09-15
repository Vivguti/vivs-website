import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: [
      { find: /^pdfjs-dist$/, replacement: 'pdfjs-dist/legacy/build/pdf.mjs' },
      { find: /^pdfjs-dist\/build\/pdf\.worker\.min\.mjs$/, replacement: 'pdfjs-dist/legacy/build/pdf.worker.min.mjs' },
      { find: /^pdfjs-dist\/web\/pdf_viewer\.mjs$/, replacement: 'pdfjs-dist/legacy/web/pdf_viewer.mjs' },
    ],
  },
})
