<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'

const loading = ref<boolean>(false)
const email = ref<string>('')
const sent = ref<boolean>(false)
const redirectUrl = ref<string | null>(null)

const { login } = useAuth()

async function handleLogin() {
  loading.value = true
  await login(email.value, redirectUrl.value)
  sent.value = true
}

onMounted(() => {
  redirectUrl.value = `${window.location.protocol}//${window.location.host}`
  console.log(redirectUrl.value)
})
</script>

<template>
  <div class="grid gap-8 py-16 px-8">
    <Logo size="large" />
    <section class="m-auto grid max-w-lg gap-8" v-if="!sent">
      <p>{{ $t('auth-description') }}</p>
      <form class="grid gap-8" @submit.prevent="handleLogin">
        <input
          type="email"
          :placeholder="$t('your-email')"
          v-model="email"
          required
        />
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
