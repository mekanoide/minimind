<script setup lang="ts">
import { useNoteStore } from '@/store/useNoteStore'
import Spinner from '@/components/Spinner.vue'
import Button from '@/components/Button.vue'
import EmptyState from '@/components/EmptyState.vue'
import NoteList from '@/components/NoteList.vue'
import NotePreview from '@/components/NotePreview.vue'

const noteStore = useNoteStore()
const pending = ref<boolean>(true)

const notes = computed(() => noteStore.notes)

onMounted(async () => {
  await noteStore.fetchNotes()
  pending.value = false
})
</script>

<template>
  <div v-if="pending" class="grid place-content-center py-24">
    <Spinner />
  </div>
  <NoteList v-else-if="!pending && notes.length > 0">
    <NotePreview
      v-for="note in noteStore.notes"
      :data="note"
      @selected="noteStore.startEditingExistingNote(note)"
      @deleted="noteStore.fetchNotes()"
    />
  </NoteList>
  <EmptyState v-else-if="!pending && noteStore.notes.length === 0">{{
    $t('empty-notes')
  }}</EmptyState>
  <div
    class="pointer-events-none fixed bottom-24 left-4 right-4 flex place-content-center"
  >
    <Button
      class="pointer-events-auto whitespace-nowrap shadow-xl"
      variant="primary"
      size="large"
      @click="noteStore.startEditingNewNote"
      ><Icon name="mdi:plus-circle-outline" size="24" /><span
        class="hidden md:inline"
        >{{ $t('add-note') }}</span
      ></Button
    >
  </div>
</template>
