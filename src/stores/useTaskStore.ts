import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Note } from '@/types/Note.js'
import { Task } from '@/types/Task.js'
import { v4 as uuidv4 } from 'uuid'

export const useTaskStore = defineStore('task', () => {
  const isEditingTask = ref<Boolean>(false)
  const currentTask = ref<Task>({
    id: null,
    content: '',
    label: '',
    finished: false,
    position: 0
  })

  const resetTask = () => {
    currentTask.value = {
      id: null,
      content: '',
      label: null,
      finished: false,
      position: 0
    }
  }

  const startEditingNewTask = () => {
    resetTask()
    isEditingTask.value = true
    currentTask.value.id = uuidv4()
  }

  const startEditingExistingTask = (Task: Task) => {
    isEditingTask.value = true
    currentTask.value = Task
  }

  const finishEditingTask = () => {
    resetTask()
    isEditingTask.value = false
  }

  return {
    isEditingTask,
    currentTask,
    startEditingNewTask,
    startEditingExistingTask,
    finishEditingTask
  }
})
