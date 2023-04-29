import * as Notifications from 'expo-notifications'
import { ActivityIndicator } from 'react-native'
import Authenticated from './components/Authenticated'
import { NavigationContainer } from '@react-navigation/native'
import Unauthenticated from './components/Unauthenticated'
import { useAuth } from '@hooks/useAuth'
import { useBackgroundLocation } from '@hooks/useBackgroundLocation'
import { useEffect } from 'react'
import { useGetSessionQuery } from '@redux/api/authApi'

export const Routes = () => {
  const { isFetching } = useGetSessionQuery()
  const { session } = useAuth()

  useBackgroundLocation()

  const removeAllNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  useEffect(() => {
    if (session) return
    removeAllNotification()
  }, [session])

  if (isFetching && !session) {
    return <ActivityIndicator style={{ flex: 1 }} size={40} />
  }

  return (
    <NavigationContainer>
      {!session ? <Unauthenticated /> : <Authenticated />}
    </NavigationContainer>
  )
}
