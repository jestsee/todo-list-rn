import * as Notifications from 'expo-notifications'
import actions, { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { checkTimeDiff } from 'src/notification'
import { haversine } from 'src/utils'
import { selectCurrentLocation } from '@redux/slice/locationSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useBackgroundLocation = () => {
  const currentLocation = useSelector(selectCurrentLocation)
  const tasks = useSelector(selectCurrentTasks)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('berubah')

    tasks.forEach(async (task) => {
      console.log('masuk loop task')

      if (!task.latitude || !task.longitude) return

      const distance = haversine(
        { latitude: task.latitude, longitude: task.longitude },
        currentLocation
      )

      // send notification if there is a task with location <= 2km
      if (distance <= 2) {
        console.log('masuk <= 2')

        // check if there is existing locationNotification and has diff < 5
        if (
          task.locationNotification &&
          !checkTimeDiff(task.locationNotification, 5 * 60 * 60)
        )
          return

        console.log('bikin notif')

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
