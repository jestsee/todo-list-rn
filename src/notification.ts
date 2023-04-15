import {
  AndroidImportance,
  NotificationRequestInput,
  cancelScheduledNotificationAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync
} from 'expo-notifications'
import { Platform } from 'react-native'
import { dayjs } from '@hooks/useDayjs'

const TIMEZONE_OFFSET = 7 * 3600 // 7 hours
const PRIOR_OFFSET = 5 * 60 // 5 minutes

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  const { status: existingStatus } = await getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    return
  }
  console.log('Notification permission granted')
}

export const scheduleNotification = async (payload: NotificationRequestInput) =>
  await scheduleNotificationAsync(payload)

export const removeScheduledNotification = async (id: string) =>
  await cancelScheduledNotificationAsync(id)

// TODO rename
export const getDiffNow = async (data: {
  deadline?: string | undefined
  notificationId?: string | undefined
  title?: string
}) => {
  if (!data.deadline) return
  const diff =
    dayjs(data.deadline).diff(dayjs(), 'second') -
    (TIMEZONE_OFFSET + PRIOR_OFFSET)
  console.log('seconds', diff)

  return await scheduleNotification({
    content: {
      title: data.title,
      body: `Due ${dayjs(data.deadline).format('DD MMM YYYY')}`
    },
    trigger: {
      seconds: diff
    }
  })
}
