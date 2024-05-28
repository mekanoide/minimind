import { openDB } from 'idb'
import type { DBSchema } from 'idb'

interface NotesTasksDB extends DBSchema {
  notes: {
    key: number
    value: {
      id?: number
      title: string
      content: string
      synced?: boolean
    }
  }
  tasks: {
    key: number
    value: {
      id?: number
      title: string
      completed: boolean
      synced?: boolean
    }
  }
}

const dbPromise = openDB<NotesTasksDB>('minimind-db', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true })
  }
})

async function getAll(storeName: 'notes' | 'tasks') {
  const db = await dbPromise
  return db.getAll(storeName)
}

async function addItem(
  storeName: 'notes' | 'tasks',
  item: NotesTasksDB['notes']['value'] | NotesTasksDB['tasks']['value']
) {
  const db = await dbPromise
  return db.add(storeName, item)
}

async function updateItem(
  storeName: 'notes' | 'tasks',
  item: NotesTasksDB['notes']['value'] | NotesTasksDB['tasks']['value']
) {
  const db = await dbPromise
  return db.put(storeName, item)
}

async function deleteItem(storeName: 'notes' | 'tasks', key: number) {
  const db = await dbPromise
  return db.delete(storeName, key)
}

export { getAll, addItem, updateItem, deleteItem }
