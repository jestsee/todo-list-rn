import { AuthStackParamList } from '@custom-types/route'
import AuthenticatedTab from './AuthenticatedTab'
import { FilterModal } from '@modules/filterModal'
import { Search } from '@components'
import { TaskModal } from '@modules/taskModal'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<AuthStackParamList>()

const Authenticated = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen
        name="Main"
        component={AuthenticatedTab}
        options={{
          title: 'Task',
          headerTitle: Search
        }}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 3000
        }}
      >
        <Stack.Screen name="TaskModal" component={TaskModal} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          animationDuration: 3000
        }}
      >
        <Stack.Screen name="FilterModal" component={FilterModal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Authenticated
