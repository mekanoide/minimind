<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
import { Sortable } from 'sortablejs-vue3'
import { useTaskStore } from '~/store/useTaskStore'

const taskStore = useTaskStore()
const pending = ref<boolean>(true)

const tasks = computed(() => taskStore.tasks)

function onFinishTaskCreation() {
  taskStore.upsertTask()
}

onMounted(async () => {
  await taskStore.fetchTasks()
  pending.value = false
})
</script>

<template>
  <Subheader>
    <form
      class="flex gap-2"
      @submit="onFinishTaskCreation">
      <input
        type="text"
        v-model="taskStore"
        placeholder="Create new task..."
        @keyup.enter="onFinishTaskCreation" />
      <button
        type="submit"
        @click="onFinishTaskCreation"
        :disabled="!content || content.length === 0"
        title="Create new task">
        <Icon
          name="mdi:plus-circle-outline"
          size="24" />
      </button>
    </form>
  </Subheader>
  <div
    v-if="pending"
    class="grid place-content-center py-24">
    <Spinner />
  </div>
  <Sortable
    v-else-if="!pending && tasks.length > 0"
    class="m-4 grid grid-cols-1 items-stretch gap-4"
    :list="tasks"
    item-key="position"
    tag="ul"
    @end="taskStore.updatePositions">
    <template #item="{ element, index }">
      <Task
        :key="element.id"
        :data="element"
        @deleted="taskStore.fetchTasks" />
    </template>
  </Sortable>
</template>
