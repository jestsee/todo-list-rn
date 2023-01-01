import {
  selectCurrentEvent,
  setEvent,
  setSession
} from '@redux/slice/authSlice'
import { supabase } from '@constants/supabase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from './useSnackbar'

export const useTrackAuth = () => {
  const dispatch = useDispatch()
  const { showSnackbar } = useSnackbar()
  const prevEvent = useSelector(selectCurrentEvent)

  useEffect(() => {
    const authStateChange = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[AUTH CHANGE]', prevEvent, event)
        dispatch(setSession({ session }))

        // display snackbar based on auth event changes
        if (prevEvent === event || prevEvent === 'INITIAL') return

        if (event === 'SIGNED_IN')
          showSnackbar({ message: 'Successfully signed in' })
        if (event === 'SIGNED_OUT') showSnackbar({ message: 'Signed out' })

        dispatch(setEvent({ event }))
      }
    )

    return () => {
      authStateChange.data.subscription.unsubscribe()
    }
  }, [prevEvent])
}
