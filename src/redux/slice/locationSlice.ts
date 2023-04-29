import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LatLng } from 'react-native-maps'
import { RootState } from '@redux/store'

const locationSlice = createSlice({
  name: 'location',
  initialState: { latitude: 0, longitude: 0 } as LatLng,
  reducers: {
    setLocation: (_, { payload }: PayloadAction<LatLng>) => payload
  }
})

export const { setLocation } = locationSlice.actions
export const { reducer: locationReducer } = locationSlice
export const selectCurrentLocation = (state: RootState) => state.location
