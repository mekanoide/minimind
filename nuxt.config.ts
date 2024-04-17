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
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:description', content: '' }
      ],
      link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]
    }
  },
  css: ['~/styles/index.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', 'nuxt-icon', '@nuxtjs/i18n'],
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
