import { RootState } from '@redux/store'
import { Task } from '@custom-types/task'
import { createSlice } from '@reduxjs/toolkit'
import { taskApi } from '@redux/api'

// TODO bisa dimasukin ke local storage kah?
// task slice dipakein redux karena mau diakses di 2 halaman berbeda
// halaman home dan tasks
const initialState: Task[] = []
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        taskApi.endpoints.getTasks.matchFulfilled,
        (_, { payload }) => payload ?? []
      )
      .addMatcher(
        taskApi.endpoints.addTask.matchFulfilled,
        (state, { payload }) => [...state, ...(payload as Task[])]
      )
      // TODO belom dicek bisa apa ngga
      .addMatcher(
        taskApi.endpoints.updateTask.matchFulfilled,
        (state, { payload }) => {
          return [
            ...state.map((item) =>
              item.id === payload.id ? { ...item, ...payload } : item
            )
          ]
        }
      )
      .addMatcher(
        taskApi.endpoints.deleteTask.matchFulfilled,
        (state, { payload }) => {
          state = state.filter((item) => item.id !== payload)
        }
      )
  }
})

export const { reducer: tasksReducer } = tasksSlice
export const selectCurrentTasks = (state: RootState) => state.tasks