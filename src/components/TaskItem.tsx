import React, { useState } from 'react'
import type { Task, Priority } from '../types/database'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
  onToggle: (taskId: string, isComplete: boolean) => Promise<boolean>
  onDelete: (taskId: string) => Promise<boolean>
}

// helper to format dates nicely
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// check if task is overdue
function isOverdue(dueDate: string | null, done: boolean) {
  if (!dueDate || done) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate) < today
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [toggling, setToggling] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleToggle() {
    setToggling(true)
    await onToggle(task.id, !task.is_complete)
    setToggling(false)
  }

  async function handleDelete() {
    if (confirm('Delete this task?')) {
      setDeleting(true)
      await onDelete(task.id)
      setDeleting(false)
    }
  }

  const overdue = isOverdue(task.due_date, task.is_complete)

  return (
    <div className={`task-item ${task.is_complete ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
      <button
        className={`task-checkbox ${task.is_complete ? 'checked' : ''}`}
        onClick={handleToggle}
        disabled={toggling}
      >
        {task.is_complete && '✓'}
      </button>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className={`task-priority priority-${task.priority}`}>
            {task.priority === 'high' ? '🔴 High' : task.priority === 'low' ? '🟢 Low' : '🟡 Normal'}
          </span>
          
          {task.due_date && (
            <span className={`task-due-date ${overdue ? 'overdue' : ''}`}>
              📅 {formatDate(task.due_date)} {overdue && '(Overdue)'}
            </span>
          )}
          
          <span className="task-created">Created {formatDate(task.created_at)}</span>
        </div>
      </div>

      <button className="task-delete" onClick={handleDelete} disabled={deleting}>
        🗑️
      </button>
    </div>
  )
}
