<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { Sortable } from 'sortablejs-vue3'
import { Icon } from '@iconify/vue'

import Layout from '@/components/Layout.vue'
import Subheader from '@/components/Subheader.vue'
import Task from '@/components/Task.vue'

import { useDebounce } from '@/composables/useDebounce'
import { useTaskStore } from '@/stores/useTaskStore'

const { debounce } = useDebounce()
const taskStore = useTaskStore()
const pending = ref<boolean>(true)

onMounted(async () => {
  await taskStore.fetchTasks()
  pending.value = false
})
</script>

<template>
  <Subheader>
    <form class="flex gap-2" @submit="onFinishTaskCreation">
      <input
        type="text"
        v-model="taskStore"
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
  </Subheader>
  <Sortable
    class="m-4 grid grid-cols-1 items-stretch gap-4"
    :list="taskStore.tasks"
    item-key="position"
    tag="ul"
    @end="taskStore.updatePositions"
  >
    <template #item="{ element, index }">
      <Task :key="element.id" :data="element" @deleted="taskStore.fetchTasks" />
    </template>
  </Sortable>
</template>
