import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import { useUser } from '@/composables/useUser'
import { Task } from '@/types/Task'

export const useTasks = () => {
  const { supabase } = useSupabaseClient()
  const { userId } = useUser()
  const tasks = ref<Task[]>([])

  const fetchTasks = async () => {
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

  const upsertTask = async (id: string, content: string, position: number) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .upsert({
          id: id,
          user_id: userId.value,
          content: content,
          position: position
        })
        .select()
      console.log('updated note', data)
      return data
    } catch (error) {
      localStorage.setItem(
        'backupContent',
        JSON.stringify({ id: id, content: content, position: position })
      )
    }
  }

  const updatePositions = async (items: Array<any>) => {
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

  const deleteTask = async (id: string) => {
    try {
      const { data, error } = await supabase.from('tasks').delete().eq('id', id)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return {
    tasks,
    fetchTasks,
    upsertTask,
    updatePositions,
    deleteTask
  }
}

export default { useTasks }
