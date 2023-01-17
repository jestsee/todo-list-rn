/* eslint-disable sort-keys */
import { Text, View } from 'react-native'
import { Badge } from '@components'
import { Task } from './task'
import { styles } from '../styles/styles'

const dummyData = [
  { id: 1, text: 'subtask 1', checked: false },
  { id: 2, text: 'subtask 2', checked: true }
]

export const Todo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.taskNameContainer}>
        <Text style={styles.taskName}>Task name</Text>
        <Badge text="Priority" />
      </View>
      <View style={styles.taskInfoContainer}>
        <Badge text="Group" outline />
        <Text>Time/deadline</Text>
      </View>
      {dummyData.map(({ id, ...rest }, idx) => (
        <Task
          {...rest}
          key={id}
          style={{ marginBottom: idx !== dummyData.length - 1 ? 12 : 0 }}
        />
      ))}
    </View>
  )
}
