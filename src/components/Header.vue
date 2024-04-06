<script setup>
import Logo from '@/components/Logo.vue'
import { Icon } from '@iconify/vue'
import { useAuth } from '@/composables/useAuth'
import { useMainStore } from '@/stores/useMainStore'
import { storeToRefs } from 'pinia'

const { logout } = useAuth()
const store = useMainStore()
const { isShowingMenu } = storeToRefs(store)

const onOpenMenu = () => {
  store.isShowingMenu = true
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
      <Icon icon="mdi:menu" width="24" />
    </button>
  </header>
</template>
