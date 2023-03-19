import { LatLng } from 'react-native-maps/lib/sharedTypes'
import { useState } from 'react'

export const useMarkerLocation = (existingCoord?: LatLng) => {
  const [markerCoords, setMarkerCoords] = useState<LatLng | undefined>(
    existingCoord
  )

  const handleMarkerChange = (coord?: LatLng) => {
    setMarkerCoords(coord)
  }

  return { markerCoords, handleMarkerChange }
}
