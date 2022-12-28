import { SignIn, SignUp } from '@modules/auth'
import { Home } from '@modules/home'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList } from '@custom-types/route'
import { SplashScreen } from '@modules/splashScreen'
import { baseStyles } from '@constants/styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '@hooks/useAuth'
import { useGetSessionQuery } from '@redux/api/supabaseApi'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Routes = () => {
  const { isFetching } = useGetSessionQuery()
  const { session } = useAuth()

  if (isFetching) {
    console.log('isFetching in routes fired', session)
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: baseStyles.contentStyle,
          headerShown: false
        }}
      >
        {!session ? (
          <>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </>
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
