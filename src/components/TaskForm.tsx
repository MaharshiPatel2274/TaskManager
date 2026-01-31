import React, { useState } from 'react'
import type { CreateTaskInput, Priority } from '../types/database'
import './TaskForm.css'

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => Promise<boolean>
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('normal')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showMore, setShowMore] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    setSubmitting(true)
    const success = await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      due_date: dueDate || undefined,
    })

    if (success) {
      // clear form
      setTitle('')
      setDescription('')
      setPriority('normal')
      setDueDate('')
      setShowMore(false)
    }
    setSubmitting(false)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-main">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" className="add-button" disabled={submitting || !title.trim()}>
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>

      <button type="button" className="toggle-advanced" onClick={() => setShowMore(!showMore)}>
        {showMore ? '- Less options' : '+ More options'}
      </button>

      {showMore && (
        <div className="task-form-advanced">
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="task-textarea"
              placeholder="Add details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                className="task-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="task-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
