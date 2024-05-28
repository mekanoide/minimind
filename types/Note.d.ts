export interface Note {
  id: string
  content: string
  created_at?: Date
  modified_at?: Date | null
  label?: number
  synced: boolean
}
