import { HomeScreen } from '@modules/index'
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import { Task } from '@modules/task'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { bottomNavigationIcon as icon } from '../constant'

const Tab = createBottomTabNavigator()

const Authenticated = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name.toLowerCase() as keyof typeof icon
          return <Icon name={icon[iconName]} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Task" component={Task} />
    </Tab.Navigator>
  )
}

export default Authenticated
