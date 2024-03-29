/* eslint-disable sort-keys */
import { authApi, profileApi, taskApi } from '@redux/api'
import { authReducer } from './slice/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { errorHandler } from './middleware/errorHandler'
import { locationReducer } from './slice/locationSlice'
import { snackbarReducer } from './slice/snackBarSlice'
import { taskFilterReducer } from './slice/taskFilterSlice'
import { tasksReducer } from './slice/tasksSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    tasks: tasksReducer,
    taskFilter: taskFilterReducer,
    location: locationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat([
      authApi.middleware,
      profileApi.middleware,
      taskApi.middleware,
      errorHandler
    ])
})

// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
