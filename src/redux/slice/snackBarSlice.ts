/* eslint-disable sort-keys */
import {
  Duration,
  ShowSnackbarPayload,
  SnackbarPayload,
  Variant
} from '@custom-types/snackbar'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: SnackbarPayload = {
  show: false,
  message: '',
  dismissable: false,
  variant: Variant.SUCCESS,
  duration: Duration.SHORT,
  manualClose: false
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show: (state, { payload }: PayloadAction<ShowSnackbarPayload>) => {
      return { ...state, show: true, ...payload }
    },
    hide: (state) => {
      state.show = false
    }
  }
})

export default snackbarSlice.actions
export const { reducer: snackbarReducer } = snackbarSlice
export const selectSnackbarState = (state: RootState) => state.snackbar
