import { SignIn, SignUp } from '@modules/auth'
import { UnauthStackParamList } from '@custom-types/route'
import { baseStyles } from '@constants/styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<UnauthStackParamList>()

const Unauthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          contentStyle: baseStyles.contentStyle
        }}
      >
        <Stack.Screen name="SignInScreen" component={SignIn} />
        <Stack.Screen name="SignUpScreen" component={SignUp} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Unauthenticated
