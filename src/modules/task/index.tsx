import { Text, TouchableOpacity, View } from 'react-native'
import { AuthNavigationType } from '@custom-types/route'
import { FontAwesome5 } from '@expo/vector-icons'
import Ionicon from '@expo/vector-icons/Ionicons'
import { TaskList } from './components/taskList'
import actions from '@redux/slice/taskFilterSlice'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useScroll } from '@hooks/useScroll'
import { useState } from 'react'

const Task = () => {
  const { navigate } = useNavigation<AuthNavigationType>()
  const { handleScroll, direction } = useScroll()

  return (
    <View>
      <TaskList onScroll={handleScroll} />
      {direction === 'up' && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 36,
            backgroundColor: 'red',
            paddingHorizontal: 16,
            paddingVertical: 4,
            borderRadius: 100
          }}
          onPress={() => navigate('SortModal')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: 'white', marginRight: 6 }}>Sort</Text>
            <FontAwesome5 name="sort-amount-down" size={12} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
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
