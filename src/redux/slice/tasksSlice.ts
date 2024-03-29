import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@redux/store'
import { Task } from '@custom-types/task'
import { taskApi } from '@redux/api'

const initialState: Task[] = []
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    emptyTask: () => [],
    addTasks: (state, { payload }: PayloadAction<Task[]>) => [
      ...state,
      ...payload
    ],
    updateTask: (state, { payload }: PayloadAction<Task>) => [
      ...state.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      )
    ]
  },
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
      .addMatcher(
        taskApi.endpoints.updateTask.matchFulfilled,
        (state, { payload }) => [
          ...state.map((item) =>
            item.id === payload.id ? { ...item, ...payload } : item
          )
        ]
      )
      .addMatcher(
        taskApi.endpoints.deleteTask.matchFulfilled,
        (state, { payload }) => [...state.filter((item) => item.id !== payload)]
      )
  }
})

export default tasksSlice.actions
export const { reducer: tasksReducer } = tasksSlice
export const selectCurrentTasks = (state: RootState) => state.tasks
