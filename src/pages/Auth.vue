<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'

const { login } = useAuth()

const loading = ref(false)
const email = ref('')
const sent = ref(false)

async function handleLogin() {
  loading.value = true
  await login(email.value)
  sent.value = true
}
</script>

<template>
  <div class="grid h-svh place-content-center p-8">
    <section class="m-auto grid max-w-lg gap-8" v-if="!sent">
      <Logo size="large" />
      <p>{{ $t('auth-description') }}</p>
      <form class="grid gap-8" @submit.prevent="handleLogin">
        <input type="email" :placeholder="$t('your-email')" v-model="email" required />
        <Button type="submit" variant="primary" size="large" :pending="loading">
          {{ $t('send-magic-link') }}
        </Button>
      </form>
    </section>
    <section class="m-auto max-w-lg" v-else>
      <p>
        {{ $t('magic-link-sent') }}
      </p>
    </section>
  </div>
</template>
