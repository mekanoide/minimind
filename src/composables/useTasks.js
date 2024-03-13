import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import { useUser } from '@/composables/useUser'

export const useTasks = () => {
  const { supabase } = useSupabaseClient()
  const { userId } = useUser()
  const tasks = ref([])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select()
        .order('created_at', { ascending: false })

      tasks.value = data
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const upsertTask = async (id, content) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .upsert({
          id: id,
          user_id: userId.value,
          content: content
        })
        .select()
      console.log('updated note', data)
      return data
    } catch (error) {
      localStorage.setItem('backupContent', { id: id, content: content })
    }
  }

  const deleteTask = async (id) => {
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
    deleteTask
  }
}
