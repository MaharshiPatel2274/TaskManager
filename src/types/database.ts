export type Priority = 'low' | 'normal' | 'high'

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  is_complete: boolean
  priority: Priority
  due_date: string | null
  created_at: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  priority?: Priority
  due_date?: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string | null
  is_complete?: boolean
  priority?: Priority
  due_date?: string | null
}

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          is_complete: boolean
          priority: Priority
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          is_complete?: boolean
          priority?: Priority
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          is_complete?: boolean
          priority?: Priority
          due_date?: string | null
          created_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
