export type Task = {
  user_id: string
  id: string
  content: string
  created_at?: string
  modified_at?: string
  label: number
  finished?: boolean
  position?: number
}
