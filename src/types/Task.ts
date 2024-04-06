export interface Task {
  id: string | null
  content: string
  created_at?: string
  modified_at?: string
  label?: string | null
  finished: boolean
  position: number
}