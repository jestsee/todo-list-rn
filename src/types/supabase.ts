import { Subtask } from './task'

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
          avatar_url?: string
          id: string
          name: string
          updated_at?: string
          username?: string
          website?: string
        }
        Insert: {
          avatar_url?: string
          id: string
          name: string
          updated_at?: string
          username?: string
          website?: string
        }
        Update: {
          avatar_url?: string
          id?: string
          name?: string
          updated_at?: string
          username?: string
          website?: string
        }
      }
      task: {
        Row: {
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
        Insert: {
          created_at?: string
          created_by: string
          deadline?: string
          group_id?: number
          id?: string
          latitude?: number
          longitude?: number
          priority?: string
          subtask?: Subtask[]
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deadline?: string
          group_id?: number
          id?: string
          latitude?: number
          longitude?: number
          priority?: string
          subtask?: Subtask[]
          title?: string
        }
      }
      users_group: {
        Row: {
          group_id: number
          user_id: string
        }
        Insert: {
          group_id: number
          user_id: string
        }
        Update: {
          group_id?: number
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      change_user_password: {
        Args: {
          current_plain_password: string
          new_plain_password: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
