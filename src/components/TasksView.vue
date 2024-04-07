<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { onMounted, watch, ref } from 'vue'
import { Sortable } from 'sortablejs-vue3'
import { Icon } from '@iconify/vue'

import Header from '@/components/Header.vue'
import Subheader from '@/components/Subheader.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Task from '@/components/Task.vue'

import { useDebounce } from '@/composables/useDebounce'
import { useTasks } from '@/composables/useTasks'

const { debounce } = useDebounce()
const { tasks, fetchTasks, upsertTask, updatePositions } = useTasks()

const content = ref('')
const taskId = ref(null)
const created = ref(false)

const onFinishTaskCreation = async () => {
  console.log('finish task creation')
  if (content.value.trim() !== '') {
    if (!taskId.value) {
      taskId.value = uuidv4()
    }
    const resp = await upsertTask(taskId.value, content.value)
    console.log('resp', resp)
    if (resp) {
      reset()
      fetchTasks()
    }
  }
}

const onUpdateTaskPosition = async ({ oldIndex, newIndex }) => {
  const movedTask = tasks.value.splice(oldIndex, 1)[0]
  tasks.value.splice(newIndex, 0, movedTask)

  // Prepara los datos solo con id y position
  const items = tasks.value.map((task, index) => ({
    id: task.id,
    position: index
  }))
  console.log('items', items)
  await updatePositions(items)
  if (resp) {
    fetchTasks()
  }
}

const reset = () => {
  localStorage.removeItem('backupContent')
  content.value = ''
  taskId.value = null
  created.value = false
}

onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <Header />
  <Subheader>
  </Subheader>
  <main>
    <Sortable
      class="m-4 grid grid-cols-1 items-stretch"
      :list="tasks"
      item-key="position"
      tag="ul"
      @end="onUpdateTaskPosition"
    >
      <template #item="{ element, index }">
        <Task :key="element.id" :data="element" @deleted="fetchTasks()" />
      </template>
    </Sortable>
    <section class="sticky top-0 m-4 bg-zinc-950" @click.prevent="">
      <form class="flex gap-2" @submit="onFinishTaskCreation">
        <input
          type="text"
          v-model="content"
          placeholder="Create new task..."
          @keyup.enter="onFinishTaskCreation"
        />
        <button
          type="submit"
          @click="onFinishTaskCreation"
          :disabled="!content || content.length === 0"
          title="Create new task"
        >
          <Icon icon="mdi:plus-circle-outline" width="24" />
        </button>
      </form>
    </section>
  </main>
  <MobileNavigation />
</template>
