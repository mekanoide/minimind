<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Note } from '@/types/Note'
import { useNoteStore } from '@/stores/useNoteStore'
import { useDialogStore } from '@/stores/useDialogStore'
import { useMarkdown } from '@/composables/useMarkdown'

const props = defineProps<{
  data: Note
}>()

const emit = defineEmits<{
  selected: never[]
  deleted: never[]
}>()

const noteStore = useNoteStore()
const dialogStore = useDialogStore()

const card = ref<HTMLElement | null>()
const content = ref<HTMLElement | null>()

const truncatedContent = computed(() => {
  return props.data.content.length > 512 ? props.data.content.slice(0, 100) + '...' : props.data.content
})
const { html, markdown } = useMarkdown(truncatedContent.value)

const padded = (value: number) => {
  return value.toString().padStart(2, '0')
}

const computedDate = computed(() => {
  const date = new Date(props.data.modified_at ?? props.data.created_at)
  const year = date.getFullYear()
  const month = padded(date.getMonth() + 1)
  const day = padded(date.getDate())
  return `${year}.${month}.${day}`
})

const onDeleteNote = async () => {
  const confirmed = await dialogStore.openDialog('Are you sure you want to delete this note?')
  if (confirmed) {
    await noteStore.deleteNote(props.data.id)
    emit('deleted')
  }
}

const getContentHeight = () => {
  if (content.value) {
    console.log(content.value.offsetHeight)
    return content.value.offsetHeight
  }
  return 0
}

const resizeCard = () => {
  if (card.value) {
    card.value.style.gridRowEnd = `span ${Math.ceil(getContentHeight() / 20)}`
  }
}
</script>

<template>
  <li
    ref="card"
    class="duration-120 group grid cursor-pointer content-between gap-2 rounded-lg border-l-8 border-transparent bg-zinc-900 px-8 py-6 shadow-lg transition-all ease-in-out hover:bg-zinc-800"
    :data-label="data.label"
    :style="`grid-row-end: span ${Math.ceil(getContentHeight() / 100)}`"
    role="button"
    @click.stop="emit('selected')"
  >
    <div class="MarkdownContent" ref="content" v-html="html">
    </div>
    <footer class="flex justify-between">
      <time class="text-zinc-500">{{ computedDate }}</time>
      <button
        type="button"
        class="text-zinc-500 opacity-0 group-hover:opacity-100"
        @click.stop="onDeleteNote"
      >
        <Icon icon="mdi:trash-can-outline" width="24" />
      </button>
    </footer>
  </li>
</template>

<style scoped>
[data-label='01'] {
  @apply border-rose-500;
}
[data-label='02'] {
  @apply border-amber-500;
}
[data-label='03'] {
  @apply border-green-500;
}
[data-label='04'] {
  @apply border-teal-500;
}
[data-label='05'] {
  @apply border-sky-500;
}
[data-label='06'] {
  @apply border-violet-500;
}
</style>
