// services/sync.ts
import { getAll, updateItem } from '@/services/localDb'

export const syncData = async () => {
  const supabase = useSupabaseClient()

  const notes = await getAll('notes')
  const tasks = await getAll('tasks')

  for (const note of notes) {
    if (!note.synced) {
      const { data, error } = await supabase.from('notes').upsert(note)

      if (!error) {
        note.synced = true
        await updateItem('notes', note)
      }
    }
  }

  for (const task of tasks) {
    if (!task.synced) {
      const { data, error } = await supabase.from('tasks').upsert(task)

      if (!error) {
        task.synced = true
        await updateItem('tasks', task)
      }
    }
  }
}
