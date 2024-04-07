<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNoteStore } from '@/stores/useNoteStore'

import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Spinner from '@/components/Spinner.vue'
import Button from '@/components/Button.vue'
import EmptyState from '@/components/EmptyState.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import NoteList from '@/components/NoteList.vue'
import NotePreview from '@/components/NotePreview.vue'
import Header from '@/components/Header.vue'
import Subheader from '@/components/Subheader.vue'
import MobileNavigation from '@/components/MobileNavigation.vue'

const noteStore = useNoteStore()
const pending = ref<boolean>(true)

onMounted(async () => {
  await noteStore.fetchNotes()
  pending.value = false
})
</script>

<template>
  <Header />
  <Subheader>
    <NoteEditor />
  </Subheader>
  <main>
    <Spinner v-if="pending" />
    <NoteList v-else-if="!pending && noteStore.notes.length > 0">
      <NotePreview
        v-for="note in noteStore.notes"
        :data="note"
        @selected="noteStore.startEditingExistingNote(note)"
        @deleted="noteStore.fetchNotes()"
      />
    </NoteList>
    <EmptyState v-else-if="!pending && noteStore.notes.length === 0"
      >No notes yet</EmptyState
    >
  </main>
  <MobileNavigation />
</template>
