/* eslint-disable sort-keys */
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState } from '@custom-types/auth'
import { RootState } from '../store'
import { supabaseApi } from '@redux/api/supabaseApi'

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
    builder.addMatcher(
      supabaseApi.endpoints.getSession.matchFulfilled,
      (state) => {
        return { ...state, event: state.session ? 'SIGNED_IN' : 'SIGNED_OUT' }
      }
    )
  }
})

export const { setSession, setEvent } = authSlice.actions
export const { reducer: authReducer } = authSlice
export const selectCurrentSession = (state: RootState) => state.auth.session
export const selectCurrentEvent = (state: RootState) => state.auth.event
