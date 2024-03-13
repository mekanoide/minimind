<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDebounce } from '@/composables/useDebounce'
import { useNotes } from '@/composables/useNotes'
import { v4 as uuidv4 } from 'uuid'

const { debounce } = useDebounce()
const { upsertNote, fetchNotes } = useNotes()

const props = defineProps({
  data: Object,
  required: false
})

const emit = defineEmits(['blurred'])

const editor = ref(null)
const content = ref(localStorage.getItem('backupContent') || '')
const noteId = ref(null)
const created = ref(false)

const onCloseEditor = async () => {
  if (content.value.trim() !== '') {
    console.log('closing editor')
    const resp = await upsertNote(noteId.value, content.value)
    console.log('resp', resp)
    if (resp) {
      reset()
      emit('blurred')
    }
  }
}

const reset = () => {
  localStorage.removeItem('backupContent')
  content.value = ''
  noteId.value = null
  created.value = false
}

onMounted(() => {
  created.value = props.data ? true : false
})

watch(content, (newContent) => {
  if (newContent.trim() !== '') {
    debounce(() => {
      if (created.value) {
        upsertNote(noteId.value, newContent)
      } else {
        noteId.value = uuidv4()
        const data = upsertNote(noteId.value, newContent)
        if (data) {
          created.value = true
        }
      }
    }, 500)
  }
})

watch(props.data, (newData) => {
  console.log('newData', newData)
  if (newData !== null) {
    content.value = newData.content
    noteId.value = newData.id
  }
})
</script>

<template>
  <section class="sticky top-0 p-4 bg-stone-950" @click.prevent="">
    <textarea
      class="focus:h-[60vh]"
      ref="editor"
      placeholder="Create a new note..."
      v-model="content"
      @blur="onCloseEditor"
    ></textarea>
    <button>Close</button>
  </section>
</template>

<style scoped>
button {
  @apply hidden;
}

textarea:focus ~ button {
  @apply block;
}
</style>
