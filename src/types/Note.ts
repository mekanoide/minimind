export interface Note {
  id: string | null
  content: string
  created_at?: Date
  modified_at?: Date | null
  label?: string | null
}