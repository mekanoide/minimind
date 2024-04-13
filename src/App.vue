<script setup>
import { useDialogStore } from '@/stores/useDialogStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useNoteStore } from './stores/useNoteStore'
import Dialog from '@/components/Dialog.vue'
import Layout from '@/components/Layout.vue'
import NoteEditor from '@/components/NoteEditor.vue'

const dialogStore = useDialogStore()
const noteStore = useNoteStore()
const loadingStore = useLoadingStore()
</script>

<template>
  <Layout>
    <RouterView></RouterView>
  </Layout>
  <Transition name="slide">
    <NoteEditor v-if="noteStore.isEditingNote" />
  </Transition>
  <Transition name="pop">
    <Dialog v-if="dialogStore.isShowingDialog" />
  </Transition>
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

.pop-enter-active,
.pop-leave-active {
  @apply transition-all duration-300;
}
.pop-enter-from,
.pop-leave-to {
  @apply translate-y-8 opacity-0;
}
</style>
