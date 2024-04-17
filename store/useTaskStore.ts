import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types/Task'
import { v4 as uuidv4 } from 'uuid'
import { useDebounce } from '@/composables/useDebounce'

export const useTaskStore = defineStore('task', () => {
  const { debounce } = useDebounce()
  const supabase = useSupabaseClient()
  const tasks = ref<Task[]>([])
  const isEditingTask = ref<Boolean>(false)

  const currentTask = ref<Task>({
    id: null,
    content: ''
  })

  function resetTask() {
    currentTask.value = {
      id: null,
      content: '',
      label: null,
      finished: false,
      position: 0
    }
  }

  function startEditingNewTask() {
    resetTask()
    isEditingTask.value = true
    currentTask.value.id = uuidv4()
  }

  function startEditingExistingTask(Task: Task) {
    isEditingTask.value = true
    currentTask.value = Task
  }

  function finishEditingTask() {
    resetTask()
    isEditingTask.value = false
  }

  async function fetchTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select()
        .order('position', { ascending: true })

      tasks.value = data
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  async function upsertTask(task: Task) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .upsert({
          id: task.id,
          content: task.content,
          position: task.position,
          finished: task.finished
        })
        .select()
      console.log('updated note', data)
      return data
    } catch (error) {
      throw new Error(`Error upserting task: ${error}`)
    }
  }

  async function updatePositions(items: Array<any>) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      const { data, error } = await supabase
        .from('tasks')
        .update({ position: i }) // i es la nueva posición
        .match({ id: item.id })

      if (error) {
        console.error('Error actualizando la base de datos:', error)
      }
    }
    return
  }

  async function deleteTask(id: string) {
    try {
      const { data, error } = await supabase.from('tasks').delete().eq('id', id)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return {
    tasks,
    isEditingTask,
    currentTask,
    startEditingNewTask,
    startEditingExistingTask,
    finishEditingTask,
    fetchTasks,
    upsertTask,
    updatePositions,
    deleteTask
  }
})
