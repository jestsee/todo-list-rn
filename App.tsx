import 'react-native-url-polyfill/auto'
// TODO import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { Routes } from './src/routes'
import { Snackbar } from '@components'
import { Subscription } from 'expo-modules-core'
import { registerForPushNotificationsAsync } from 'src/notification'
import { store } from '@redux/store'
import { useContact } from '@hooks/useContact'
import { useLocation } from '@hooks/useLocation'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})
export default function App() {
  const { requestLocationPermission } = useLocation()
  const { requestContactPermission } = useContact()

  // notification
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    requestLocationPermission()
    requestContactPermission()
    registerForPushNotificationsAsync()

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Routes />
        <Snackbar />
      </Provider>
    </GestureHandlerRootView>
  )
}
