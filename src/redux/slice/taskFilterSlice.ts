import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@redux/store'
import { TaskFilter } from '@custom-types/task'

const initialState: TaskFilter = {}
const tasksFilterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    search: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
    }
    // TODO other filters
  }
})

export default tasksFilterSlice.actions
export const { reducer: taskFilterReducer } = tasksFilterSlice
export const selectTaskFilter = (state: RootState) => state.taskFilter
