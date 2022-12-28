export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      group: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          name: string
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          name: string
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          name?: string
          avatar_url?: string | null
          website?: string | null
        }
      }
      subtask: {
        Row: {
          id: number
          description: string
          done: boolean | null
          task_id: number | null
          created_at: string | null
        }
        Insert: {
          id?: number
          description: string
          done?: boolean | null
          task_id?: number | null
          created_at?: string | null
        }
        Update: {
          id?: number
          description?: string
          done?: boolean | null
          task_id?: number | null
          created_at?: string | null
        }
      }
      task: {
        Row: {
          id: number
          title: string
          group_id: number | null
          longitude: number | null
          latitude: number | null
          priority: string | null
          deadline: string | null
          created_at: string | null
          created_by: string
        }
        Insert: {
          id?: number
          title: string
          group_id?: number | null
          longitude?: number | null
          latitude?: number | null
          priority?: string | null
          deadline?: string | null
          created_at?: string | null
          created_by: string
        }
        Update: {
          id?: number
          title?: string
          group_id?: number | null
          longitude?: number | null
          latitude?: number | null
          priority?: string | null
          deadline?: string | null
          created_at?: string | null
          created_by?: string
        }
      }
      users_group: {
        Row: {
          user_id: string
          group_id: number
        }
        Insert: {
          user_id: string
          group_id: number
        }
        Update: {
          user_id?: string
          group_id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
