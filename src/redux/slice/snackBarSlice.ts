/* eslint-disable sort-keys */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SnackbarPayload } from '@custom-types/snackbar'

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: { show: false } as SnackbarPayload,
  reducers: {
    setSnackbar: (
      state,
      { payload: { show } }: PayloadAction<SnackbarPayload>
    ) => {
      state.show = show
    }
  }
})

export const { setSnackbar } = snackbarSlice.actions
export const { reducer: snackbarReducer } = snackbarSlice
export const selectSnackbarState = (state: RootState) => state.snackbar
