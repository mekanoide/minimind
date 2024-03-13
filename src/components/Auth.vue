<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()

const loading = ref(false)
const email = ref('')
const sent = ref(false)

const handleLogin = async () => {
    await login(email.value)
    sent.value = true
}
</script>

<template>
  <section class="max-w-lg m-auto" v-if="!sent">
    <form class="grid gap-4" @submit.prevent="handleLogin">
        <p class="description">Sign in via magic link with your email below</p>
        <input type="email" placeholder="Your email" v-model="email" required />
        <button type="submit" :disabled="loading">
          {{ loading ? 'o' : 'Send magic link' }}
        </button>
    </form>
  </section>
  <section class="max-w-lg m-auto" v-else>
    <p class="description">
      We've sent a magic link to your email. Click the link to sign in.
    </p>
  </section>
</template>

style
