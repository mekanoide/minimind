<script setup lang="ts">
import { ref, watch, onMounted, Transition, computed } from 'vue'
import { useNoteStore } from '@/stores/useNoteStore'
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'
import { Note } from '@/types/Note'
import { useMarkdown } from '@/composables/useMarkdown'

const noteStore = useNoteStore()

const editor = ref<HTMLElement | null>(null)
const content = ref<String>(localStorage.getItem('backupContent') || '')
const noteId = ref<String | null>(null)
const showingLabels = ref<Boolean>(false)

const formattedContent = computed(() => {
  /*   const strng = content.value.toString()
  const { html, markdown } = useMarkdown(strng) */
  return content.value
})

const labels = [
  { id: '01', name: 'Personal' },
  { id: '02', name: 'Work' },
  { id: '03', name: 'School' },
  { id: '04', name: 'Home' },
  { id: '05', name: 'Home' },
  { id: '06', name: 'Home' }
]

const onUpdateContent = (event: Event) => {
  const target = event?.target as HTMLElement
  noteStore.updateNoteContent(target.textContent || '')
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
  <section :data-editing="noteStore.isEditingNote" class="bg-zinc-900 p-4">
    <div class="mx-auto grid w-full max-w-5xl grid-rows-[1fr_auto]">
      <pre
        class="overflow-auto"
        ref="editor"
        contenteditable="true"
        @input.prevent="onUpdateContent"
        >{{ content }}</pre
      >
      <footer class="flex gap-2">
        <Button
          variant="primary"
          type="button"
          @click="noteStore.finishEditingNote"
        >
          {{ $t('finish') }}
        </Button>
        <div class="relative">
          <Button
            type="button"
            @click="onToggleLabels"
            :label="$t('show-labels')"
          >
            <Icon icon="mdi:label-outline" width="24" />
          </Button>
          <menu
            v-if="showingLabels"
            class="absolute bottom-full grid w-max grid-cols-3 gap-2"
          >
            <li v-for="(label, index) in labels" :key="index">
              <button
                :data-label="label.id"
                type="button"
                class="block aspect-square w-16 rounded-md"
              ></button>
            </li>
          </menu>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped>
[data-editing='true'] {
  @apply fixed inset-0 z-50;
}

[data-label='01'] {
  @apply bg-rose-500;
}
[data-label='02'] {
  @apply bg-amber-500;
}
[data-label='03'] {
  @apply bg-green-500;
}
[data-label='04'] {
  @apply bg-teal-500;
}
[data-label='05'] {
  @apply bg-sky-500;
}
[data-label='06'] {
  @apply bg-violet-500;
}
</style>
