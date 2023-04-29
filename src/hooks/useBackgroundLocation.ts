import * as Notifications from 'expo-notifications'
import actions, { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { checkTimeDiff } from 'src/notification'
import { haversine } from 'src/utils'
import { selectCurrentLocation } from '@redux/slice/locationSlice'
import { useEffect } from 'react'

export const useBackgroundLocation = () => {
  const currentLocation = useSelector(selectCurrentLocation)
  const tasks = useSelector(selectCurrentTasks)
  const dispatch = useDispatch()

  useEffect(() => {
    tasks.forEach(async (task) => {
      if (!task.latitude || !task.longitude) return

      const distance = haversine(
        { latitude: task.latitude, longitude: task.longitude },
        currentLocation
      )

      // send notification if there is a task with location <= 2km
      if (distance <= 2) {
        // check if there is existing locationNotification and has diff < 5
        if (
          task.locationNotification &&
          !checkTimeDiff(task.locationNotification, 5 * 60 * 60)
        )
          return

        await Notifications.scheduleNotificationAsync({
          content: {
            title: task.title,
            // eslint-disable-next-line prettier/prettier
            body: 'This task\'s location is nearby!'
          },
          trigger: null
        })

        // update task's locationNotification
        dispatch(
          actions.updateTask({
            ...task,
            locationNotification: new Date().toLocaleString()
          })
        )
      }
    })
  }, [currentLocation])
}
