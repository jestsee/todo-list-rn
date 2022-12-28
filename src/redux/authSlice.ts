/* eslint-disable sort-keys */
import { AuthState } from '@custom-types/auth'
import { RootState } from './store'
import { createSlice } from '@reduxjs/toolkit'
import { supabaseApi } from './api/supabaseApi'

const authSlice = createSlice({
  name: 'auth',
  initialState: { session: null } as AuthState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(supabaseApi.endpoints.signOut.matchFulfilled, (state) => {
        state.session = null
      })
      .addMatcher(
        supabaseApi.endpoints.getSession.matchFulfilled,
        (state, { payload: { session } }) => {
          state.session = session
        }
      )
      .addMatcher(
        supabaseApi.endpoints.signIn.matchFulfilled,
        (state, { payload: { session } }) => {
          state.session = session
        }
      )
  }
})

export const { reducer: authReducer } = authSlice
export const selectCurrentSession = (state: RootState) => state.auth.session
