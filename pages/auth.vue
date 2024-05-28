<script setup lang="ts">
definePageMeta({
  layout: 'clear'
})
import { useAuth } from '@/composables/useAuth'
import { useMainStore } from '@/store/useMainStore'

const mainStore = useMainStore()
const loading = ref<boolean>(false)
const email = ref<string>('')
const code = ref<string>('')
const sent = ref<boolean>(false)

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
  loading.value = false
  await navigateTo('/')
}

async function onStartOffline() {
  mainStore.setOfflineMode()
  await navigateTo('/')
}
</script>

<template>
  <div
    class="grid items-start gap-8 px-8 py-16 grid-rows-[auto_1fr_auto] h-dvh">
    <Logo size="large" />
    <section
      class="mx-auto grid max-w-md w-full gap-8"
      v-if="!sent">
      <p>{{ $t('auth-description') }}</p>
      <form
        class="grid gap-8"
        @submit.prevent="onLogin">
        <input
          type="email"
          :placeholder="$t('your-email')"
          v-model="email"
          required />
        <Button
          type="submit"
          variant="primary"
          :pending="loading">
          {{ $t('send-otp-code') }}
        </Button>
      </form>
    </section>
    <section
      class="mx-auto max-w-md w-full grid gap-8"
      v-else>
      <p>
        {{ $t('otp-sent') }}
      </p>
      <form
        class="grid gap-8"
        @submit.prevent="onOtpVerification">
        <input
          type="text"
          :placeholder="$t('placeholders.otp')"
          v-model="code"
          required />
        <Button
          type="submit"
          variant="primary"
          :pending="loading">
          {{ $t('sign-in') }}
        </Button>
      </form>
    </section>
    <footer class="mx-auto max-w-md grid">
      <Button
        type="button"
        @click.prevent="onStartOffline">
        {{ $t('use-offline') }}
      </Button>
    </footer>
  </div>
</template>
