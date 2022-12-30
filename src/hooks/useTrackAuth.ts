import { setSession } from '@redux/slice/authSlice'
import { supabase } from '@constants/supabase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const useTrackAuth = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const authStateChange = supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setSession({ session }))
    })
    return () => {
      authStateChange.data.subscription.unsubscribe()
    }
  }, [])
}
