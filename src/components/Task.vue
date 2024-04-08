<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()

const props = defineProps({
  data: Object
})

const emit = defineEmits(['update:checked'])

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
    class="group flex items-center gap-4 rounded-lg border-t-4 border-transparent bg-zinc-800 px-6 py-4 shadow-lg transition-all ease-in-out hover:bg-zinc-800"
  >
    <div class="grid">
      <input
        :id="`task-${data.index}`"
        type="checkbox"
        class="col-start-1 row-start-1 h-6 w-6 appearance-none rounded border-2 border-zinc-500 checked:border-zinc-200 checked:bg-zinc-200"
        :checked="data.done"
        @input="emit('update:checked', $event.target.checked)"
      />
      <Icon icon="carbon-tick" class="col-start-1 row-start-1 text-green-500" />
    </div>
    <label class="flex-1" :for="`task-${data.index}`">
      {{ data.content }}
    </label>
    <button
      class="text-zinc-200 opacity-0 group-hover:opacity-100"
      @click="onDeleteTask"
    >
      <Icon icon="mdi:trash-can-outline" width="24" />
    </button>
  </li>
</template>
