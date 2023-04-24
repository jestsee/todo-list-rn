import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { setLocation } from '@redux/slice/locationSlice'
import { store } from '@redux/store'
import { useState } from 'react'

const LOCATION_TASK_NAME = 'LOCATION_TASK_NAME'

// Define the background task for location tracking
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({
    data,
    error
  }: TaskManager.TaskManagerTaskBody<{
    locations?: Array<Location.LocationObject>
  }>) => {
    if (error) return console.error(error)
    if (data) {
      // Extract location coordinates from data
      const { locations } = data
      if (!locations) return console.log('there is no locations')
      const location = locations[0]
      if (location) {
        store.dispatch(setLocation(location.coords))
      }
    }
  }
)

export const useLocation = () => {
  const [loading, setLoading] = useState(false)
  const [initialLocation, setInitialLocation] =
    useState<Location.LocationObject>()

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted')
        return console.log('Location permission (foreground) denied')
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync()
      if (backgroundStatus !== 'granted')
        return console.log('Location permission (background) denied')
      startBackgroundUpdate()
    } catch (err) {
      console.warn(err)
      // show error
    }
  }

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) return console.log('Task is not defined')

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) return console.log('Already started')

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#fff'
      }
    })
  }

  // Stop location tracking in background

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
    loading,
    initialLocation,
    requestLocationPermission,
    getInitialLocation
  }
}
