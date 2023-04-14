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

export enum TaskSortType {
  closestDeadline,
  furthestDeadline,
  highestPriority,
  lowestPriority
}

export type SortValue =
  | 'closestDeadline'
  | 'furthestDeadline'
  | 'highestPriority'
  | 'lowestPriority'

export interface TaskFilter {
  search?: string
  priority?: Priority
  date?: string
  sort: SortValue
}

export type Priority = 'low' | 'medium' | 'high'
