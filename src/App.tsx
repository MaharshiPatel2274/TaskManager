import { useAuth } from './hooks/useAuth'
import { useTasks } from './hooks/useTasks'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import './App.css'

function App() {
  const { user, loading: authLoading, error: authError } = useAuth()
  const { tasks, loading, error, createTask, toggleComplete, deleteTask } = useTasks(user?.id)

  // show loading while setting up auth
  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="spinner-large"></div>
        <p>Setting up...</p>
      </div>
    )
  }

  // show error if auth failed
  if (authError) {
    return (
      <div className="app-error">
        <div className="error-container">
          <h2>Connection Error</h2>
          <p>{authError}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <span className="guest-badge">Guest User</span>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <TaskForm onSubmit={createTask} />
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onToggle={toggleComplete}
            onDelete={deleteTask}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Task Manager - Built with React & Supabase</p>
      </footer>
    </div>
  )
}

export default App
