import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import { useUser } from '@/composables/useUser'
import { Note } from '@/types/Note.js'

export const useNotes = () => {
  const { supabase } = useSupabaseClient()
  const { userId } = useUser()
  const notes = ref<Note[]>([])

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

  const fetchNote = async (id: string) => {
    console.log('fetching note', id)
    try {
      const { data, error } = await supabase
        .from('notes')
        .select()
        .eq('id', id)
        .single()
      console.log('note fetched', data)
      const index = notes.value.findIndex(note => note.id === id)
      if (index !== -1) {
        notes.value.splice(index, 1, data[0])
      }
    } catch (error) {
      console.error('Error fetching note:', error)
    }
  }

  const upsertNote = async (note: Note) => {
    console.log('upserting note', note)
    try {
      const { data, error } = await supabase
        .from('notes')
        .upsert({
          id: note.id,
          user_id: userId.value,
          content: note.content,
          label: note.label
        })
        .select()
      console.log('updated note', data)
      return data
    } catch (error) {
      localStorage.setItem('backupContent', { id: note.id, content: note.content })
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return {
    notes,
    fetchNotes,
    fetchNote,
    upsertNote,
    deleteNote
  }
}

export default { useNotes }
