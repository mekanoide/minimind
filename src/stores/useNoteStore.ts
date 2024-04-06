import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDebounce } from '@/composables/useDebounce'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import { Note } from '@/types/Note.js'
import { v4 as uuidv4 } from 'uuid'

export const useNoteStore = defineStore('note', () => {
  const { debounce } = useDebounce()
  const { supabase } = useSupabaseClient()
  const notes = ref<Note[]>([])
  const isEditingNote = ref<Boolean>(false)

  const currentNote = ref<Note>({
    id: null,
    content: ''
  })

  const resetNote = () => {
    currentNote.value = {
      id: null,
      content: '',
      label: null
    }
  }

  const startEditingNewNote = () => {
    resetNote()
    isEditingNote.value = true
    currentNote.value.id = uuidv4()
  }

  const startEditingExistingNote = (note: Note) => {
    isEditingNote.value = true
    currentNote.value = note
  }

  const finishEditingNote = () => {
    resetNote()
    isEditingNote.value = false
  }

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

  function updateNoteContent(content: string) {
    currentNote.value.content = content
    debounce(async () => {
      const data = await upsertNote({
        id: currentNote.value.id,
        content: currentNote.value.content
      })
    }, 500)
  }

  async function fetchNote(id: string) {
    console.log('fetching note', id)
    try {
      const { data, error } = await supabase
        .from('notes')
        .select()
        .eq('id', id)
        .single()
      console.log('note fetched', data)
      const index = notes.value.findIndex((note) => note.id === id)
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
          content: note.content,
          label: note.label
        })
        .select()
      console.log('updated note', data)
      return data
    } catch (error) {
      localStorage.setItem('backupContent', {
        id: note.id,
        content: note.content
      })
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
    isEditingNote,
    currentNote,
    startEditingNewNote,
    startEditingExistingNote,
    finishEditingNote,
    updateNoteContent,
    fetchNotes,
    fetchNote,
    upsertNote,
    deleteNote
  }
})
