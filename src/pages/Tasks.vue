<script setup>
import { v4 as uuidv4 } from 'uuid'
import { onMounted, watch, ref } from 'vue'
import { Sortable } from 'sortablejs-vue3'

import Task from '@/components/Task.vue'

import { useDebounce } from '@/composables/useDebounce'
import { useTasks } from '@/composables/useTasks'

const { debounce } = useDebounce()
const { tasks, fetchTasks, upsertTask } = useTasks()

const content = ref('')
const taskId = ref(null)
const created = ref(false)

const onFinishTaskCreation = async () => {
  console.log('finish task creation')
  if (content.value.trim() !== '') {
    if(!taskId.value) {
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
  <Sortable
    class="m-4 grid grid-cols-1 items-stretch gap-4"
    :list="tasks"
    item-key="id"
    tag="ul"
  >
    <template #item="{ element, index }">
      <Task :key="element.id" :data="element" @deleted="fetchTasks()" />
    </template>
  </Sortable>
  <section class="sticky top-0 m-4 bg-stone-950" @click.prevent="">
    <form class="flex gap-2" @submit="onFinishTaskCreation">
      <input
        type="text"
        v-model="content"
        placeholder="Create new task..."
        @keyup.enter="onFinishTaskCreation"
      />
      <button type="submit" @click="onFinishTaskCreation" :disabled="!content || content.length === 0">
        {{ created ? 'Save' : 'Create' }}
      </button>
    </form>
  </section>

  <!--   <Tasks v-if="tasks && tasks.length > 0">
    <Task
      v-for="(task, index) in tasks"
      :key="task.id"
      :index="index"
      :checked="task.done"
      >{{ task.content }}</Task
    >
  </Tasks>
  <EmptyState v-else>No tasks yet</EmptyState>
 -->
</template>
