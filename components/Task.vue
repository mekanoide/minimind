<script setup lang="ts">

import { useTaskStore } from '~/store/useTaskStore'
import type { Task } from '@/types/Task'

const taskStore = useTaskStore()

const props = defineProps<{
  data: Task
}>()

const emit = defineEmits<{
  deleted: never[]
}>()

async function onDeleteTask() {
  const confirmed = window.confirm('Are you sure you want to delete this task?')
  if (confirmed) {
    console.log('delete task')
    await taskStore.deleteTask(props.data.id)
    emit('deleted')
  }
}
</script>

<template>
  <li
    class="flex items-center gap-4 rounded-2xl border-l-8 border-transparent bg-zinc-900 px-6 py-4 shadow-lg transition-all ease-in-out hover:bg-zinc-800"
    :data-state="data.finished ? 'finished' : 'unfinished'"
  >
    <div class="relative flex items-center">
      <input
        :id="`task-${data.position}`"
        type="checkbox"
        class="col-start-1 row-start-1 h-6 w-6 appearance-none rounded-2xl border-2 border-zinc-500 checked:border-zinc-200 checked:bg-zinc-200"
        :checked="data.finished"
        @change="taskStore.upsertTask(data)"
      />
      <Icon v-if="data.finished" name="mdi:check" class="absolute inset-0 pointer-events-none" size="24" />
    </div>
    <label class="flex-1" :for="`task-${data.position}`">
      {{ data.content }}
    </label>
    <button
      class="text-zinc-200 opacity-0 group-hover:opacity-100"
      @click="onDeleteTask"
    >
      <Icon name="mdi:trash-can-outline" size="24" />
    </button>
  </li>
</template>

<style scoped>
[data-state='finished'] {
  @apply opacity-50;
}
</style>