/* eslint-disable sort-keys */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState } from '@custom-types/auth'
import { RootState } from '../store'
import { Session } from '@supabase/supabase-js'

const authSlice = createSlice({
  name: 'auth',
  initialState: { session: null } as AuthState,
  reducers: {
    setSession: (
      state,
      { payload: { session } }: PayloadAction<{ session: Session | null }>
    ) => {
      state.session = session
    }
  }
})

export const { setSession } = authSlice.actions
export const { reducer: authReducer } = authSlice
export const selectCurrentSession = (state: RootState) => state.auth.session
