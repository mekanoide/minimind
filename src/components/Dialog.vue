<script setup>
// Imports
import { storeToRefs } from 'pinia'
import { useDialogStore } from '@/stores/useDialogStore'
import Button from '@/components/Button.vue'
// Props

// Emits

// Reactive properties
const dialog = useDialogStore()
const { resolve, message } = storeToRefs(dialog)
const { cancel, confirm } = dialog

// Computed properties

// Methods

// Lifecycle hooks

// Watchers
</script>

<template>
  <div class="fixed inset-0 grid place-content-center bg-zinc-950 bg-opacity-80 transition-all p-4">
    <div class="rounded-lg bg-zinc-900 p-8 shadow-xl grid gap-8">
      <p>{{ message }}</p>
      <footer class="flex gap-2">
        <Button type="button" @click="cancel">{{ $t('cancel') }}</Button>
        <Button type="button" variant="primary" @click="confirm">{{ $t('confirm') }}</Button>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
