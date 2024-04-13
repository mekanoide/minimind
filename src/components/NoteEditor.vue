<script setup lang="ts">
import { ref, watch, onMounted, Transition, computed } from 'vue'
import { useNoteStore } from '@/stores/useNoteStore'
import Button from '@/components/Button.vue'
import LabelSelector from '@/components/LabelSelector.vue'
import { Note } from '@/types/Note'
import { useLabelColors } from '@/composables/useLabelColors'

const noteStore = useNoteStore()
const colors = useLabelColors(noteStore.currentNote.label)
const editor = ref<HTMLElement | null>(null)
const content = ref<string>('')
const noteId = ref<string | null>(null)
const showingLabels = ref<boolean>(false)


function onUpdateContent(e: Event) {
  content.value = (e.currentTarget as HTMLInputElement).value
  noteStore.updateNoteContent(content.value)
}

const onToggleLabels = () => {
  showingLabels.value = showingLabels.value ? false : true
}

onkeydown = (e) => {
  if (e.key === 'Escape') {
    noteStore.finishEditingNote()
  }
}

onMounted(() => {
  content.value = noteStore.currentNote.content
  if (editor.value) {
    editor.value.focus()
  }
})
</script>

<template>
  <section class="fixed inset-0 z-10 w-full bg-gradient-to-b from-zinc-900 to-black p-4">
    <div class="mx-auto grid h-full w-full max-w-5xl grid-rows-[1fr_auto]">
      <textarea
        class="w-full overflow-y-auto bg-transparent text-white"
        ref="editor"
        :placeholder="$t('placeholders.editor')"
        :value="content"
        @update="onUpdateContent"
      ></textarea>
      <footer class="flex gap-2">
        <Button
          variant="primary"
          type="button"
          @click="noteStore.finishEditingNote"
        >
          {{ $t('finish') }}
        </Button>
        <LabelSelector :label="noteStore.currentNote.label" />
      </footer>
    </div>
  </section>
</template>
