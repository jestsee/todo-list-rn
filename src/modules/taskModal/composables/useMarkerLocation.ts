import { LatLng } from 'react-native-maps/lib/sharedTypes'
import { useState } from 'react'

export const useMarkerLocation = () => {
  const [markerCoords, setMarkerCoords] = useState<LatLng>()

  const handleMarkerChange = (coord?: LatLng) => {
    setMarkerCoords(coord)
  }

  return { markerCoords, handleMarkerChange }
}
