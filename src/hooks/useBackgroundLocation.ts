import * as Notifications from 'expo-notifications'
import { useEffect, useRef } from 'react'
import { haversine } from 'src/utils'
import { selectCurrentLocation } from '@redux/slice/locationSlice'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useSelector } from 'react-redux'

export const useBackgroundLocation = () => {
  const currentLocation = useSelector(selectCurrentLocation)
  const tasks = useSelector(selectCurrentTasks)
  const ref = useRef(currentLocation)

  useEffect(() => {
    const oldLocation = ref.current

    // check if old and current location equal
    if (
      oldLocation.latitude === currentLocation.latitude &&
      oldLocation.longitude === currentLocation.longitude
    )
      return

    console.log('berubah')

    tasks.forEach((task) => {
      if (!task.latitude || !task.longitude) return

      const distance = haversine(
        { latitude: task.latitude, longitude: task.longitude },
        currentLocation
      )

      // send notification if there is a task with location <= 2km
      if (distance <= 2) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: task.title,
            // eslint-disable-next-line prettier/prettier
            body: 'This task\'s location is nearby!'
          },
          trigger: null
        })
      }
    })

    ref.current = currentLocation
  }, [currentLocation])
}
