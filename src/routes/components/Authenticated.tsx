import { AuthStackParamList } from '@custom-types/route'
import AuthenticatedTab from './AuthenticatedTab'
import { TaskModal } from '@modules/taskModal'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<AuthStackParamList>()

const Authenticated = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Main" component={AuthenticatedTab} />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 5000
        }}
      >
        <Stack.Screen name="TaskModal" component={TaskModal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Authenticated
