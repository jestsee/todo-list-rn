/* eslint-disable sort-keys */
import { RectButton, Swipeable } from 'react-native-gesture-handler'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { AuthNavigationType } from '@custom-types/route'
import { Badge } from '@components'
import { Ionicons } from '@expo/vector-icons'
import RightSwipeActions from './rightSwipeAction'
import { Subtask as SubtaskType } from './subtask'
import { Task as TaskType } from '@custom-types/task'
import { baseStyles } from '@constants/styles'
import { dayjs } from '@hooks/useDayjs'
import { styles } from '../styles/styles'
import { useDeleteTaskMutation } from '@redux/api/taskApi'
import { useNavigation } from '@react-navigation/native'
interface Props extends TaskType {
  style?: StyleProp<ViewStyle>
}

export const priorityColor = {
  low: baseStyles.successColor,
  medium: baseStyles.warnColor,
  high: baseStyles.errorColor
}

export const Task: React.FC<Props> = (item) => {
  const { style, ...task } = item
  const { id, title, deadline, subtask, priority, notificationId } = task

  const { navigate } = useNavigation<AuthNavigationType>()
  const [deleteTask] = useDeleteTaskMutation()

  return (
    <Swipeable
      overshootRight={false}
      overshootFriction={8}
      renderRightActions={() => (
        <RightSwipeActions
          onDelete={() => deleteTask({ id, notificationId })}
        />
      )}
    >
      <RectButton
        style={[styles.container, style]}
        onPress={() => navigate('TaskModal', { task })}
      >
        <View style={styles.taskNameContainer} pointerEvents="none">
          <Text
            style={[styles.taskName, { marginRight: 16 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Badge
            style={priorityColor[priority as keyof typeof priorityColor]}
            text="Priority"
          />
        </View>
        <View style={styles.taskInfoContainer}>
          {deadline && (
            <View style={{ flexDirection: 'row' }}>
              <Ionicons
                style={{ marginRight: 12 }}
                name="calendar-sharp"
                size={18}
                color="black"
              />
              <Text>{dayjs(deadline).format('DD MMMM YYYY')}</Text>
            </View>
          )}
        </View>
        {subtask?.slice(0, 2).map((item, idx) => (
          <SubtaskType
            {...item}
            key={idx}
            style={{ marginBottom: idx !== subtask.length - 1 ? 12 : 8 }}
          />
        ))}
      </RectButton>
    </Swipeable>
  )
}
