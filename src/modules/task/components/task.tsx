/* eslint-disable sort-keys */
import {
  GestureHandlerRootView,
  RectButton
} from 'react-native-gesture-handler'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { AuthNavigationType } from '@custom-types/route'
import { Badge } from '@components'
import { Ionicons } from '@expo/vector-icons'
import RightSwipeActions from './rightSwipeAction'
import { Subtask as SubtaskType } from './subtask'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Task as TaskType } from '@custom-types/task'
import { styles } from '../styles/styles'
import { useDeleteTaskMutation } from '@redux/api/taskApi'
import { useNavigation } from '@react-navigation/native'
interface Props extends TaskType {
  style?: StyleProp<ViewStyle>
}

export const Task: React.FC<Props> = (item) => {
  const { style, ...task } = item
  const { id, title, deadline, group_id, subtask } = task

  const { navigate } = useNavigation<AuthNavigationType>()
  const [deleteTask] = useDeleteTaskMutation()

  return (
    <GestureHandlerRootView>
      <Swipeable
        overshootRight={false}
        overshootFriction={8}
        renderRightActions={() => (
          <RightSwipeActions onDelete={() => deleteTask(id)} />
        )}
      >
        <RectButton
          style={[styles.container, style]}
          onPress={() => navigate('TaskModal', { task })}
        >
          <View style={styles.taskNameContainer}>
            <Text style={styles.taskName}>{title}</Text>
            <Badge text="Priority" />
          </View>
          <View style={styles.taskInfoContainer}>
            <Badge text={group_id ? 'Group' : 'Personal'} outline />
            {deadline && (
              <View style={{ flexDirection: 'row' }}>
                <Ionicons
                  style={{ marginRight: 4 }}
                  name="alarm-outline"
                  size={18}
                  color="black"
                />
                <Text>{deadline}</Text>
              </View>
            )}
          </View>
          {subtask?.map((item, idx) => (
            <SubtaskType
              {...item}
              key={idx}
              style={{ marginBottom: idx !== subtask.length - 1 ? 12 : 8 }}
            />
          ))}
        </RectButton>
      </Swipeable>
    </GestureHandlerRootView>
  )
}
