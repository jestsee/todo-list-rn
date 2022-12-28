import 'react-native-url-polyfill/auto'
import { SignIn, SignUp } from '@modules/auth'
import { Home } from '@modules/home'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { RootStackParamList } from '@custom-types/route'
import { baseStyles } from '@constants/styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { store } from '@redux/store'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: baseStyles.contentStyle,
            headerShown: false
          }}
        >
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
