/* eslint-disable sort-keys */
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { AuthNavigationType } from '@custom-types/route'
import { Badge } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Subtask as SubtaskType } from './subtask'
import { Task as TaskType } from '@custom-types/task'
import { styles } from '../styles/styles'
import { useNavigation } from '@react-navigation/native'

interface Props extends TaskType {
  style?: StyleProp<ViewStyle>
}

export const Task: React.FC<Props> = (item) => {
  const { style, ...task } = item
  const { title, deadline, group_id, subtask } = task
  const { navigate } = useNavigation<AuthNavigationType>()
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  )
}
