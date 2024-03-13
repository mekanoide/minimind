import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import { useUser } from '@/composables/useUser'

export const useNotes = () => {
  const { supabase } = useSupabaseClient()
  const { userId } = useUser()
  const notes = ref([])

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select()
        .order('modified_at', { ascending: false })

      console.log('notes', data)
      notes.value = data
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const upsertNote = async (id, content) => {
    try {
      const { data, error } = await supabase
        .from('notes')
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

  const deleteNote = async (id) => {
    try {
      const { data, error } = await supabase.from('notes').delete().eq('id', id)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return {
    notes,
    fetchNotes,
    upsertNote,
    deleteNote
  }
}
