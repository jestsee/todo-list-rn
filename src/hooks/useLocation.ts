import * as Location from 'expo-location'
import { useState } from 'react'

export const useLocation = () => {
  const [loading, setLoading] = useState(false)
  const [initialLocation, setInitialLocation] =
    useState<Location.LocationObject>()

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        console.log('Location permission granted')
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
      // show error
    }
  }

  const getInitialLocation = async () => {
    setLoading(true)
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      })
      setInitialLocation(location)
      setLoading(false)
    } catch (err) {
      // TODO snackbar error
      console.warn(err)
      setLoading(false)
    }
  }

  return {
    initialLocation,
    loading,
    requestLocationPermission,
    getInitialLocation
  }
}
