/* eslint-disable sort-keys */
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { Badge } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Subtask } from '@custom-types/task'
import { Subtask as TaskType } from './subtask'
import { styles } from '../styles/styles'

interface Props {
  style?: StyleProp<ViewStyle>
  title: string
  deadline?: string
  group_id?: number
  subtask?: Subtask[]
}

export const Task: React.FC<Props> = (item) => {
  const { style, title, deadline, group_id, subtask } = item
  return (
    <View style={[styles.container, style]}>
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
        <TaskType
          {...item}
          key={idx}
          style={{ marginBottom: idx !== subtask.length - 1 ? 12 : 8 }}
        />
      ))}
    </View>
  )
}
