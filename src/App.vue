<script setup>
import { useDialogStore } from '@/stores/useDialogStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useNoteStore } from './stores/useNoteStore'
import Dialog from '@/components/Dialog.vue'
import NoteEditor from '@/components/NoteEditor.vue'

const dialogStore = useDialogStore()
const noteStore = useNoteStore()
const loadingStore = useLoadingStore()
</script>

<template>
  <RouterView></RouterView>
  <Transition name="slide">
    <NoteEditor v-if="noteStore.isEditingNote" />
  </Transition>
  <Dialog v-if="dialogStore.isShowingDialog" />
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-300;
}
.slide-enter-from,
.slide-leave-to {
  @apply translate-y-full opacity-0;
}

</style>