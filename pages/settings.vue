<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  middleware: ['auth']
})

const pending = ref<boolean>(true)
const { logout } = useAuth()

async function onLogout() {
  await logout()
  navigateTo('/auth')
}

onMounted(async () => {
  pending.value = false
})
</script>

<template>
  <div
    v-if="pending"
    class="grid place-content-center py-24">
    <Spinner />
  </div>
  <div v-else>
    <Button
      @click.prevent="onLogout">
      {{ $t('sign-out') }}
    </Button>
  </div>
</template>
