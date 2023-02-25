export interface Task {
  created_at?: string
  created_by: string
  deadline?: string
  group_id?: number
  id: string
  latitude?: number
  longitude?: number
  priority?: string
  subtask?: Subtask[]
  title: string
}

export interface Subtask {
  text?: string
  checked?: boolean
}
