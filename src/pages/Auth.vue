<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'

const loading = ref<boolean>(false)
const email = ref<string>('')
const code = ref<string>('')
const sent = ref<boolean>(false)
const redirectUrl = ref<string | null>(null)

const { login, verifyOtp } = useAuth()

async function onLogin() {
  loading.value = true
  await login(email.value)
  sent.value = true
  loading.value = false
}

async function onOtpVerification() {
  loading.value = true
  await verifyOtp(email.value, code.value)
}



onMounted(() => {
  redirectUrl.value = `${window.location.protocol}//${window.location.host}`
  console.log(redirectUrl.value)
})
</script>

<template>
  <div class="grid gap-8 px-8 py-16">
    <Logo size="large" />
    <section class="m-auto grid max-w-lg gap-8" v-if="!sent">
      <p>{{ $t('auth-description') }}</p>
      <form class="grid gap-8" @submit.prevent="onLogin">
        <input
          type="email"
          :placeholder="$t('your-email')"
          v-model="email"
          required
        />
        <Button type="submit" variant="primary" size="large" :pending="loading">
          {{ $t('send-otp-code') }}
        </Button>
      </form>
    </section>
    <section class="m-auto max-w-lg" v-else>
      <p>
        {{ $t('otp-sent') }}
      </p>
      <form class="grid gap-8" @submit.prevent="onOtpVerification">
        <input type="text" :placeholder="$t('otp')" v-model="code" required />
        <Button type="submit" variant="primary" size="large" :pending="loading">
          {{ $t('login') }}
        </Button>
      </form>
    </section>
  </div>
</template>
