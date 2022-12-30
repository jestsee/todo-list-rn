import { SignIn, SignUp } from '@modules/auth'
import { Home } from '@modules/home'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList } from '@custom-types/route'
import { SplashScreen } from '@modules/splashScreen'
import { baseStyles } from '@constants/styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '@hooks/useAuth'
import { useGetSessionQuery } from '@redux/api/supabaseApi'
import { useTrackAuth } from '@hooks/useTrackAuth'
import { Snackbar } from '@components'
import { useSnackbar } from '@hooks/useSnackbar'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Routes = () => {
  const { isFetching } = useGetSessionQuery()
  const { session } = useAuth()
  const { show } = useSnackbar()
  useTrackAuth()

  if (isFetching) {
    return <SplashScreen />
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group
            screenOptions={{
              contentStyle: baseStyles.contentStyle
            }}
          >
            {!session ? (
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            ) : (
              <Stack.Screen name="Home" component={Home} />
            )}
          </Stack.Group>
          {/* <Stack.Group screenOptions={{ presentation: 'modal' }}></Stack.Group> */}
        </Stack.Navigator>
      </NavigationContainer>
      {show && <Snackbar message="cihuy" />}
    </>
  )
}
