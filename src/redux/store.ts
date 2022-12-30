/* eslint-disable sort-keys */
import { authReducer } from './slice/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { errorHandler } from './middleware/errorHandler'
import { supabaseApi } from '@redux/api/supabaseApi'
import { snackbarReducer } from './slice/snackBarSlice'

export const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    auth: authReducer,
    snackbar: snackbarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([supabaseApi.middleware, errorHandler])
})

// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
