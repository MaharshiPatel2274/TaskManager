import type { Task } from '../types/database'
import { TaskItem } from './TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
  onToggle: (taskId: string, isComplete: boolean) => Promise<boolean>
  onDelete: (taskId: string) => Promise<boolean>
}

export function TaskList({ tasks, loading, error, onToggle, onDelete }: TaskListProps) {
  // show loading spinner
  if (loading) {
    return (
      <div className="task-list-state">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    )
  }

  // show error message
  if (error) {
    return (
      <div className="task-list-state error">
        <p>Error: {error}</p>
      </div>
    )
  }

  // show empty state
  if (tasks.length === 0) {
    return (
      <div className="task-list-state empty">
        <h3>No tasks yet</h3>
        <p>Add your first task above!</p>
      </div>
    )
  }

  // split into complete and incomplete
  const activeTasks = tasks.filter(t => !t.is_complete)
  const doneTasks = tasks.filter(t => t.is_complete)

  return (
    <div className="task-list">
      {activeTasks.length > 0 && (
        <div className="task-section">
          <h2 className="section-title">Active Tasks ({activeTasks.length})</h2>
          {activeTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}

      {doneTasks.length > 0 && (
        <div className="task-section">
          <h2 className="section-title completed-title">Completed ({doneTasks.length})</h2>
          {doneTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
