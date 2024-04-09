export type Note = {
  user_id: string
  id?: string
  content: string
  created_at?: Date
  modified_at?: Date | null
  label?: string | null
}