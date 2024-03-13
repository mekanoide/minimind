<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTasks } from '@/composables/useTasks'

const { deleteTask } = useTasks()

const props = defineProps({
  data: Object
})

const emit = defineEmits(['update:checked'])

const onDeleteTask = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this task?')
  if (confirmed) {
    console.log('delete task')
    await deleteTask(props.data.id)
    emit('deleted')
  }
}
</script>

<template>
  <li class="group flex gap-4">
    <input
      :id="`task-${data.index}`"
      type="checkbox"
      class="h-6 w-6 appearance-none rounded border-2 border-stone-500 checked:border-stone-200 checked:bg-stone-200"
      :checked="data.done"
      @input="emit('update:checked', $event.target.checked)"
    />
    <Icon icon="carbon-tick" class="text-green-500" />
    <label :for="`task-${data.index}`">
      {{ data.content }}
    </label>
    <button class="text-stone-500 opacity-0 group-hover:opacity-100" @click="onDeleteTask"><Icon icon="carbon:trash-can" width="20" /></button>
  </li>
</template>
