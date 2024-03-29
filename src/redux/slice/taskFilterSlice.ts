import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Priority, SortValue, TaskFilter } from '@custom-types/task'
import { RootState } from '@redux/store'

const initialState: TaskFilter = { sort: 'closestDeadline' }
const tasksFilterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    search: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
    },
    selectPriority: (
      state,
      { payload }: PayloadAction<Priority | undefined>
    ) => {
      state.priority = payload
    },
    selectDate: (state, { payload }: PayloadAction<string | undefined>) => {
      state.date = payload
    },
    selectSort: (state, { payload }: PayloadAction<SortValue>) => {
      state.sort = payload
    }
  }
})

export default tasksFilterSlice.actions
export const { reducer: taskFilterReducer } = tasksFilterSlice
export const selectTaskFilter = (state: RootState) => state.taskFilter
