<script setup lang="ts">
import Logo from '@/components/Logo.vue'

import { useAuth } from '@/composables/useAuth'
import { useMainStore } from '~/store/useMainStore'

const mainStore = useMainStore()

const onOpenMenu = () => {
  mainStore.toggleMenu()
}
</script>

<template>
  <header class="grid grid-cols-4 bg-zinc-900 p-4">
    <Logo class="col-span-2 col-start-2" />
    <button
      class="col-start-4 justify-self-end text-zinc-400 hover:text-zinc-200"
      type="button"
      @click.prevent="onOpenMenu"
      label="Log out"
    >
      <Icon name="mdi:menu" size="24" />
    </button>
  </header>
</template>
