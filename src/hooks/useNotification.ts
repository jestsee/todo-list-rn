import {
  NotificationRequestInput,
  getAllScheduledNotificationsAsync,
  scheduleNotificationAsync
} from 'expo-notifications'
import { useEffect, useRef } from 'react'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useSelector } from 'react-redux'

// TODO deleting soon
export const scheduleNotification = async (payload: NotificationRequestInput) =>
  await scheduleNotificationAsync(payload)

export const useNotification = () => {
  /* TODO
  3. kalo edit harus tau mana yang diedit, notifnya juga diedit
     - hapus notif terjadwal yang udah ada
     - tambah lagi yang baru
  4. kalo berkurang harus tau mana yang dihapus, notif dihapus -> cancel by id
  5. kalo bertambah tinggal nambahin biasa
  
  -- gimana cara dapet id existing task --
  simpan current id -> bikin slice baru
  
  1. pas logout hapus semua notif terjadwal -> cancel all
  2. pas login jadwalin notif
  
  */

  const tasks = useSelector(selectCurrentTasks)
  const ref = useRef(tasks)

  const _getNotif = async () => {
    const res = await getAllScheduledNotificationsAsync()
    console.log('[all notif]', res.length)
  }

  useEffect(() => {
    const oldTasks = ref.current

    // add
    if (tasks.length > oldTasks.length) {
      console.log('[notif] add task')
    }
    // remove
    else if (tasks.length < oldTasks.length) {
      console.log('[notif] remove task')
    }
    // edit
    else {
      console.log('[notif] edit task')
    }

    _getNotif()

    ref.current = tasks
  }, [tasks])
}
