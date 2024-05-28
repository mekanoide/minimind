export interface Task {
  id: string
  content: string
  created_at: string
  modified_at?: string
  priority?: number
  finished?: boolean
  position?: number
  synced: boolean
}
