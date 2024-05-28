<script setup lang="ts">
import { ref, watch, onMounted, Transition, computed } from 'vue'
import { useNoteStore } from '@/store/useNoteStore'
import { useLabelColors } from '@/composables/useLabelColors'

const noteStore = useNoteStore()
const colors = computed(() => useLabelColors(noteStore.currentNote?.label ?? 0))
const editor = ref<HTMLElement | null>(null)
const content = ref<string>('')
const noteId = ref<string | null>(null)
const showingLabels = ref<boolean>(false)

function onUpdateContent(e: Event) {
  content.value = (e.target as HTMLInputElement).value
  noteStore.updateNoteContent(content.value)
}

function onLabelUpdate(label: number) {
  noteStore.updateNoteLabel(label)
}

onkeydown = (e) => {
  if (e.key === 'Escape') {
    noteStore.finishEditingNote()
  }
}

onMounted(() => {
  content.value = noteStore.currentNote?.content ?? ''
  if (editor.value) {
    editor.value.focus()
  }
})
</script>

<template>
  <section
    class="fixed inset-0 z-10 w-full grid grid-rows-[1fr_auto] bg-black">
    <div
      class="mx-auto grid h-full w-full max-w-5xl p-4 rounded-b-xl"
      :class="[colors.editor]">
      <textarea
        class="w-full overflow-y-auto bg-transparent"
        ref="editor"
        :placeholder="$t('placeholders.editor')"
        :value="content"
        @input="onUpdateContent"></textarea>
    </div>
    <footer class="flex gap-2 p-4">
      <Button
        variant="primary"
        type="button"
        @click="noteStore.finishEditingNote">
        {{ $t('finish') }}
      </Button>
      <LabelSelector :label="noteStore.currentNote.label" @update="onLabelUpdate" />
    </footer>
  </section>
</template>
