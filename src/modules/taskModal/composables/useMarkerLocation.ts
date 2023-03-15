import { LatLng } from 'react-native-maps/lib/sharedTypes'
import { useState } from 'react'

export const useMarkerLocation = () => {
  const [markerCoords, setMarkerCoords] = useState<LatLng>()

  const handleMarkerChange = (coord: LatLng) => {
    console.log('coord', coord)
    setMarkerCoords(coord)
  }

  return { markerCoords, handleMarkerChange }
}
