import Authenticated from './components/Authenticated'
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen } from 'src/routes/components/SplashScreen'
import Unauthenticated from './components/Unauthenticated'
import { useAuth } from '@hooks/useAuth'
import { useGetSessionQuery } from '@redux/api/authApi'

export const Routes = () => {
  const { isFetching } = useGetSessionQuery()
  const { session } = useAuth()

  if (isFetching) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      {!session ? <Unauthenticated /> : <Authenticated />}
    </NavigationContainer>
  )
}
