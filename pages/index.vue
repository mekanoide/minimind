<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const db = nuxtApp.$db

import { useNoteStore } from '@/store/useNoteStore'

const noteStore = useNoteStore()
const pending = ref<boolean>(true)

const notes = computed(() => noteStore.notes)

onMounted(async () => {
  await noteStore.fetchNotes()
  pending.value = false
})
</script>

<template>
  <div
    v-if="pending"
    class="grid place-content-center py-24">
    <Spinner />
  </div>
  <NoteList v-else-if="!pending && notes.length > 0">
    <NotePreview
      v-for="note in noteStore.notes"
      :data="note"
      @selected="noteStore.startEditingExistingNote(note)"
      @deleted="noteStore.fetchNotes()" />
  </NoteList>
  <EmptyState v-else-if="!pending && noteStore.notes.length === 0">{{
    $t('empty-notes')
  }}</EmptyState>
</template>
