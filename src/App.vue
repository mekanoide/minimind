<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import { useQuillEditor } from './composables/useQuillEditor'
import Logo from './components/Logo.vue'
import Editor from './components/Editor.vue'
import Card from './components/Card.vue'

const editor = ref(null)
const content = ref('')

const notes = ref([
  {
    id: 1,
    datetime: '20240229',
    content: 'Sit amet consectetur.'
  },
  {
    id: 2,
    datetime: '20240229',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    id: 3,
    datetime: '20240229',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    id: 4,
    datetime: '20240229',
    content:
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  {
    id: 5,
    datetime: '20240229',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    id: 6,
    datetime: '20240229',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    id: 7,
    datetime: '20240229',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  }
])

onMounted(() => {
  console.log('mounted', editor.value)
  editor.value = useQuillEditor(editor.value)
})
</script>

<template>
  <header class="Header"><Logo /></header>
  <main>
    <Editor />
    <ul class="Cards">
      <Card v-for="note in notes" :data="note" :key="note.id" />
    </ul>
  </main>
</template>

<style scoped>
.Header {
  @apply mx-auto p-2;
}
.Cards {
  @apply grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4;
}
</style>
