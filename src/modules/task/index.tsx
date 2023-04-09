import Ionicon from '@expo/vector-icons/Ionicons'
import { TaskList } from './components/taskList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react'

const Task = () => {
  return (
    <>
      <TaskList />
    </>
  )
}

const Stack = createNativeStackNavigator()

export const TaskNavigator = () => {
  const [showFilter, setShowFilter] = useState(true)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskNavigator"
        component={Task}
        options={{
          title: 'Task',
          headerSearchBarOptions: {
            onOpen: () => setShowFilter(false),
            onClose: () => setShowFilter(true),
            placeholder: 'Search task'
          },
          headerRight: () =>
            showFilter ? (
              <Ionicon name="md-filter" size={24} color="darkgrey" />
            ) : null
        }}
      />
    </Stack.Navigator>
  )
}
