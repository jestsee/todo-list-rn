import { SUPABASE_SECRET, SUPABASE_URL } from '@constants/env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Database } from '@custom-types/supabase'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SECRET, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: AsyncStorage
  }
})
