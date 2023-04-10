import { AuthNavigationType } from '@custom-types/route'
import Ionicon from '@expo/vector-icons/Ionicons'
import { TaskList } from './components/taskList'
import actions from '@redux/slice/taskFilterSlice'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
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
  const { navigate } = useNavigation<AuthNavigationType>()
  const [showFilter, setShowFilter] = useState(true)
  const dispatch = useDispatch()

  const { search } = actions
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
            onChangeText: (event) => dispatch(search(event.nativeEvent.text)),
            placeholder: 'Search task'
          },
          headerRight: () =>
            showFilter ? (
              <Ionicon
                name="md-filter"
                size={24}
                color="darkgrey"
                onPress={() => navigate('FilterModal')}
              />
            ) : null
        }}
      />
    </Stack.Navigator>
  )
}
