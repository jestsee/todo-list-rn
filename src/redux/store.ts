/* eslint-disable sort-keys */
import { authReducer } from './authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { supabaseApi } from '@redux/api/supabaseApi'

export const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware)
})

// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
