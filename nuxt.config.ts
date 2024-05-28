// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'minimind',
      meta: [
        { name: 'robots', content: 'none' },
        { property: 'og:site_name', content: 'minimind' },
        { property: 'og:title', content: 'minimind' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_EN' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:description', content: '' }
      ],
      link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]
    }
  },
  css: ['@/styles/index.css'],
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Minimind',
      short_name: 'Minimind',
      description: 'hey',
      theme_color: '#000000',
      background_color: '#000000',
      lang: 'en',
      display: 'standalone',
      icons: [
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,mjs,css,html,ico,png,json,svg}'],
      runtimeCaching: [
        // Cache assets
        {
          urlPattern: '/',
          handler: 'CacheFirst'
        }
      ],
      cleanupOutdatedCaches: true
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/auth',
      callback: '/auth',
      include: undefined,
      exclude: [],
      cookieRedirect: false
    }
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-GB', file: 'en-GB.json' },
      { code: 'es', iso: 'es-ES', file: 'es-ES.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n',
      redirectOn: 'root'
    },
    strategy: 'prefix_and_default'
  }
})
