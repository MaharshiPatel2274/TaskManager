import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

// get env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// make sure we have the keys
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// create and export the client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
