<script setup lang="ts">
// Imports
import { useDialogStore } from '~/store/useDialogStore'
import Button from '@/components/Button.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue';
// Props

// Emits

// Reactive properties
const dialogStore = useDialogStore()
const modal = ref<HTMLElement | null>(null)
// Computed properties

// Methods

function onEscPress() {
  dialogStore.cancel()
}

// Lifecycle hooks

onClickOutside(modal, () => {
  dialogStore.cancel()
})

onkeydown = (event) => {
  if (event.key === 'Escape') {
    dialogStore.cancel()
  }
}

// Watchers
</script>

<template>
  <div
    class="fixed inset-0 grid place-content-center bg-zinc-950 bg-opacity-80 p-4 transition-all"
  >
    <div ref="modal" class="grid gap-8 rounded-2xl bg-zinc-900 p-8 shadow-xl">
      <p>{{ dialogStore.message }}</p>
      <footer class="flex gap-2">
        <Button type="button" @click="dialogStore.cancel">{{
          $t('cancel')
        }}</Button>
        <Button type="button" variant="primary" @click="dialogStore.confirm">{{
          $t('confirm')
        }}</Button>
      </footer>
    </div>
  </div>
</template>
