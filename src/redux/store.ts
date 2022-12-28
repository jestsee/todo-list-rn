/* eslint-disable sort-keys */
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { supabaseApi } from '@redux/api/supabaseApi'

export const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware)
})

setupListeners(store.dispatch)
