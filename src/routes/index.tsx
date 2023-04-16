import * as Notifications from 'expo-notifications'
import Authenticated from './components/Authenticated'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/routes/components/SplashScreen'
import Unauthenticated from './components/Unauthenticated'
import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'
import { useGetSessionQuery } from '@redux/api/authApi'
import { useNotification } from '@hooks/useNotification'
export const Routes = () => {
  const { isFetching } = useGetSessionQuery()
  const { session } = useAuth()

  useNotification()

  const removeAllNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  useEffect(() => {
    if (session) return
    removeAllNotification()
  }, [session])

  if (isFetching && !session) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      {!session ? <Unauthenticated /> : <Authenticated />}
    </NavigationContainer>
  )
}
