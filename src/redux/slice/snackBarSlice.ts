/* eslint-disable sort-keys */
import {
  Duration,
  ShowSnackbarPayload,
  SnackbarPayload,
  Variant
} from '@custom-types/snackbar'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Payload = PayloadAction<ShowSnackbarPayload>

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
    hide: (state) => {
      state.show = false
    },
    show: (state, { payload }: Payload) => {
      return { ...state, ...payload, show: true, variant: Variant.SUCCESS }
    },
    error: (state, { payload }: Payload) => {
      return { ...state, ...payload, show: true, variant: Variant.ERROR }
    },
    warn: (state, { payload }: Payload) => {
      return { ...state, ...payload, show: true, variant: Variant.WARN }
    },
    info: (state, { payload }: Payload) => {
      return { ...state, ...payload, show: true, variant: Variant.INFO }
    }
  }
})

export default snackbarSlice.actions
export const { reducer: snackbarReducer } = snackbarSlice
export const selectSnackbarState = (state: RootState) => state.snackbar
