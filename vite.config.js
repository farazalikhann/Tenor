import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// The Capacitor-bundled Android app serves files from its own WebView root
// (no /Tenor/ subpath exists there), while GitHub Pages serves from
// /Tenor/. CAP_BUILD switches which one this build targets.
const isCapacitorBuild = process.env.CAP_BUILD === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: isCapacitorBuild ? '/' : '/Tenor/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png'],
      manifest: {
        name: 'Tenor — Loan Calculator',
        short_name: 'Tenor',
        description: 'Know your loan, to the last unit. Calculate payments, compare loans, and plan prepayments.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/Tenor/',
        scope: '/Tenor/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],
})
