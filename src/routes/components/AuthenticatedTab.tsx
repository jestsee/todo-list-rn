import { Contact } from '@modules/contact'
import { Home } from '@modules/home'
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import { Mock } from '@components'
import { Profile } from '@modules/profile'
import { Task } from '@modules/task'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { bottomNavigationIcon as icon } from '../constant'

const Tab = createBottomTabNavigator()

const AuthenticatedTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name as keyof typeof icon
          return <Icon name={icon[iconName]} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 12,
          height: 70,
          alignContent: 'center',
          alignItems: 'center'
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{ title: 'Contact' }}
      />
      <Tab.Screen
        name="Add Task"
        component={Mock}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('TaskModal')
          }
        })}
      />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default AuthenticatedTab
