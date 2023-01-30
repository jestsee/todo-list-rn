import { SignIn, SignUp } from '@modules/auth'
import { RootStackParamList } from '@custom-types/route'
import { baseStyles } from '@constants/styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<RootStackParamList>()

const Unauthenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          contentStyle: baseStyles.contentStyle
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}></Stack.Group> */}
    </Stack.Navigator>
  )
}

export default Unauthenticated
