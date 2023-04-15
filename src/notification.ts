import {
  AndroidImportance,
  NotificationRequestInput,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync
} from 'expo-notifications'
import { Platform } from 'react-native'

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
