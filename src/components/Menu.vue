<script setup lang="ts">
// Imports
import MenuItem from '@/components/MenuItem.vue'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useMainStore } from '@/stores/useMainStore'

// Props

// Emits

// Reactive properties
const mainStore = useMainStore()
const menu = ref<HTMLElement | null>(null)
const router = useRouter()
const { logout } = useAuth()
// Computed properties

// Methods

async function onLogout() {
  await logout()
  router.push('/auth')
}

// Lifecycle hooks

onClickOutside(menu, () => {
  mainStore.hideMenu()
})

onkeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    mainStore.hideMenu()
  }
}

// Watchers
</script>

<template>
  <menu
    ref="menu"
    class="fixed bottom-0 right-0 top-0 z-50 bg-zinc-900 px-8 py-4 min-w-[50vw] shadow-lg"
  >
    <MenuItem @click="onLogout">{{ $t('log-out') }}</MenuItem>
  </menu>
</template>

<style scoped></style>
