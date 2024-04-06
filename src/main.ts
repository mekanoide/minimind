import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './index.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import enGB from './locales/en-GB.json'
import esES from './locales/es-ES.json'

type MessageSchema = typeof enGB

const i18n = createI18n<[MessageSchema], 'en-GB' | 'es-ES'>({
  legacy: false,
  locale: 'en-GB',
  fallbackLocale: 'en-GB',
  messages: {
    'en-GB': enGB,
    'es-ES': esES
  }
})

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(i18n)
app.mount('#app')
