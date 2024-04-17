import Dexie from 'dexie'
import { ref } from 'vue'
import type { Note } from '@/types/Note'
import type { Task } from '@/types/Task'
import { v4 as uuidv4 } from 'uuid'

// Define la estructura de la base de datos
class MiniDb extends Dexie {
  notes: Dexie.Table<Note>
  tasks: Dexie.Table<Task>

  constructor() {
    super('MiniDb')
    this.version(1).stores({
      notes: '++id, content, created_at',
      tasks: '++id, content, created_at'
    })
    this.notes = this.table('notes')
    this.tasks = this.table('tasks')
  }
}

const db = new MiniDb()

export function useLocalDatabase() {
  const notes = ref<Note>([])

  async function loadNotes() {
    notes.value = await db.notes.toArray()
  }

  async function addNote(content: string) {
    notes.value.push({
      id: uuidv4(),
      content,
      created_at: Date.now(),
      label: 0
    })
  }

  return { notes, loadNotes, addNote }
}