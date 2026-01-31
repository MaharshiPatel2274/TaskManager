import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // check if user is already logged in
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          setLoading(false)
        } else {
          // no session, sign in as guest
          const { data, error } = await supabase.auth.signInAnonymously()
          if (error) throw error
          setUser(data.user)
          setLoading(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth failed')
        setLoading(false)
      }
    }

    checkSession()

    // listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, error }
}
