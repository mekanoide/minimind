<script setup>
import { ref, onMounted } from 'vue'
import { useNotes } from '@/composables/useNotes'

import EmptyState from '@/components/EmptyState.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import Cards from '@/components/Cards.vue'
import Card from '@/components/Card.vue'

const { notes, fetchNotes } = useNotes()

const onSelectNote = (note) => {
  console.log('selected note', note)
  editorData.value = note
  console.log('selected note', editorData.value)
}

onMounted(() => {
  fetchNotes()
})
</script>

<template>
  <NoteEditor @blurred="fetchNotes()" :data="editorData" />
  <Cards v-if="notes && notes.length > 0">
    <Card
      v-for="note in notes"
      :data="note"
      :key="note.id"
      @selected="onSelectNote"
      @deleted="fetchNotes()"
    />
  </Cards>
  <EmptyState v-else>No notes yet</EmptyState>
</template>
