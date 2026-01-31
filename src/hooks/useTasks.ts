import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Task, CreateTaskInput } from '../types/database'

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // fetch all tasks for user
  async function fetchTasks() {
    if (!userId) return

    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setTasks(data || [])
    }
    setLoading(false)
  }

  // create new task
  async function createTask(input: CreateTaskInput) {
    if (!userId) return false

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title: input.title,
        description: input.description || null,
        priority: input.priority || 'normal',
        due_date: input.due_date || null,
        is_complete: false,
      })
      .select()
      .single()

    if (error) {
      setError(error.message)
      return false
    }

    setTasks([data, ...tasks])
    return true
  }

  // toggle task complete
  async function toggleComplete(taskId: string, isComplete: boolean) {
    console.log('Toggling task:', taskId, 'to', isComplete)
    
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_complete: isComplete })
      .eq('id', taskId)
      .select()
      .single()

    if (error) {
      console.error('Toggle error:', error)
      setError(error.message)
      return false
    }

    console.log('Task toggled:', data)
    setTasks(tasks.map(t => t.id === taskId ? data : t))
    return true
  }

  // delete task
  async function deleteTask(taskId: string) {
    console.log('Deleting task:', taskId)
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Delete error:', error)
      setError(error.message)
      return false
    }

    console.log('Task deleted successfully')
    setTasks(tasks.filter(t => t.id !== taskId))
    return true
  }

  useEffect(() => {
    fetchTasks()
  }, [userId])

  return { tasks, loading, error, createTask, toggleComplete, deleteTask }
}
