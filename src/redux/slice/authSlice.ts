/* eslint-disable sort-keys */
import * as Notifications from 'expo-notifications'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState } from '@custom-types/auth'
import { RootState } from '../store'
import { authApi } from '@redux/api/authApi'

const authSlice = createSlice({
  name: 'auth',
  initialState: { session: null, event: 'INITIAL' } as AuthState,
  reducers: {
    setSession: (
      state,
      { payload: { session } }: PayloadAction<{ session: Session | null }>
    ) => {
      state.session = session
    },
    setEvent: (
      state,
      { payload: { event } }: PayloadAction<{ event: AuthChangeEvent }>
    ) => {
      state.event = event
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        authApi.endpoints.getSession.matchFulfilled,
        (_, { payload: { session } }) => {
          if (!session) {
            Notifications.cancelAllScheduledNotificationsAsync()
          }
          return { session, event: session ? 'SIGNED_IN' : 'SIGNED_OUT' }
        }
      )
      // TODO pake isAny kalo yg signIn via github dah bisa
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (_, { payload: { session } }) => {
          return { session, event: 'SIGNED_IN' }
        }
      )
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, () => {
        return { session: null, event: 'SIGNED_OUT' }
      })
  }
})

export const { setSession, setEvent } = authSlice.actions
export const { reducer: authReducer } = authSlice
export const selectCurrentSession = (state: RootState) => state.auth.session
export const selectCurrentEvent = (state: RootState) => state.auth.event
