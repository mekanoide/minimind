<script setup>
import { toRaw, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useNotes } from '@/composables/useNotes'
const props = defineProps({
  data: Object
})

const emit = defineEmits(['selected', 'deleted'])

const { deleteNote } = useNotes()

const padded = (value) => {
  return value.toString().padStart(2, '0')
}

const computedDate = computed(() => {
  const date = new Date(props.data.modified_at ?? props.data.created_at)
  const year = date.getFullYear()
  const month = padded(date.getMonth() + 1)
  const day = padded(date.getDate())
  return `${year}.${month}.${day}`
})

const onSelectNote = () => {
  emit('selected', toRaw(props.data))
}

const onDeleteNote = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this note?')
  if (confirmed) {
    console.log('delete note')
    await deleteNote(props.data.id)
    emit('deleted')
  }
}
</script>

<template>
  <li
    class="group grid cursor-pointer grid-rows-[auto_1fr] gap-2 rounded-xl border-2 border-stone-700 p-4 transition-all duration-300 ease-in-out hover:border-stone-200"
    role="button"
    @click="onSelectNote"
  >
    <header class="flex justify-between">
      <time class="text-stone-500">{{ computedDate }}</time>
      <button type="button" class="text-stone-500" @click.prevent="onDeleteNote">
        <Icon icon="carbon-trash-can" />
      </button>
    </header>
    <p class="line-clamp-6" v-html="data.content"></p>
  </li>
</template>
