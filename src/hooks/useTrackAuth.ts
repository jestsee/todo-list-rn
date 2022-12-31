import { useEffect, useRef } from 'react'
import { AuthChangeEvent } from '@supabase/supabase-js'
import { setSession } from '@redux/slice/authSlice'
import { supabase } from '@constants/supabase'
import { useDispatch } from 'react-redux'
import { useSnackbar } from './useSnackbar'

export const useTrackAuth = () => {
  const dispatch = useDispatch()
  const { showSnackbar } = useSnackbar()
  const prev = useRef<AuthChangeEvent>()

  useEffect(() => {
    const authStateChange = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setSession({ session }))

        // display snackbar based on auth event changes
        if (prev.current === event) return
        if (event === 'SIGNED_IN')
          showSnackbar({ message: 'Successfully signed in' })
        if (event === 'SIGNED_OUT') showSnackbar({ message: 'Signed out' })

        // keep track of previous event
        prev.current = event
        console.log('AUTH CHANGE')
      }
    )

    return () => {
      authStateChange.data.subscription.unsubscribe()
    }
  }, [])
}
