/* eslint-disable sort-keys */
import { authApi, profileApi } from '@redux/api'
import { authReducer } from './slice/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { errorHandler } from './middleware/errorHandler'
import { snackbarReducer } from './slice/snackBarSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    auth: authReducer,
    snackbar: snackbarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      profileApi.middleware,
      errorHandler
    ])
})

// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
