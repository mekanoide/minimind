<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNoteStore } from '@/stores/useNoteStore'
import Spinner from '@/components/Spinner.vue'
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'
import EmptyState from '@/components/EmptyState.vue'
import NoteList from '@/components/NoteList.vue'
import NotePreview from '@/components/NotePreview.vue'
import Layout from '@/components/Layout.vue'
import Subheader from '@/components/Subheader.vue'

const noteStore = useNoteStore()
const pending = ref<boolean>(true)

onMounted(async () => {
  await noteStore.fetchNotes()
  pending.value = false
})
</script>

<template>
  <Layout>
    <Subheader> </Subheader>
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
    <div class="fixed left-4 right-4 bottom-24 pointer-events-none flex place-content-center">
      <Button
        class="pointer-events-auto whitespace-nowrap shadow-xl shadow-zinc-950"
        variant="primary"
        size="large"
        @click="noteStore.startEditingNewNote"
        ><Icon icon="mdi:plus-circle-outline" class="w-8 h-8" /><span class="hidden md:inline">{{ $t('add-note') }}</span></Button
      >
    </div>
  </Layout>
</template>
