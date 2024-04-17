<script setup lang="ts">
import { useDialogStore } from '~/store/useDialogStore'
import { useLoadingStore } from '~/store/useLoadingStore'
import { useNoteStore } from '~/store/useNoteStore'
import { useMainStore } from '~/store/useMainStore'

const dialogStore = useDialogStore()
const noteStore = useNoteStore()
const mainStore = useMainStore()
const loadingStore = useLoadingStore()

const overlayConditions = computed(() => {
  return dialogStore.isShowingDialog || mainStore.isShowingMenu
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Transition name="opacity">
    <div
      v-if="overlayConditions"
      class="fixed inset-0 bg-zinc-950 bg-opacity-50"></div>
  </Transition>
  <Transition name="slide">
    <NoteEditor v-if="noteStore.isEditingNote" />
  </Transition>
  <Transition name="pop">
    <Dialog v-if="dialogStore.isShowingDialog" />
  </Transition>
  <Transition name="slide-from-right">
    <Menu v-if="mainStore.isShowingMenu" />
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

.slide-from-right-enter-active,
.slide-from-right-leave-active {
  @apply transition-all duration-300;
}
.slide-from-right-enter-from,
.slide-from-right-leave-to {
  @apply translate-x-full opacity-0;
}

.pop-enter-active,
.pop-leave-active {
  @apply transition-all duration-300;
}
.pop-enter-from,
.pop-leave-to {
  @apply translate-y-8 opacity-0;
}

.opacity-enter-active,
.opacity-leave-active {
  @apply transition-all duration-300;
}
.opacity-enter-from,
.opacity-leave-to {
  @apply opacity-0;
}
</style>