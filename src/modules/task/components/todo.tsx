import { Text, View } from 'react-native'
import { Badge } from '@components'
import { Task } from './task'
import { baseStyles } from '@constants/styles'
import { styles } from '../styles/styles'

export const Todo = () => {
  return (
    <View style={styles.container}>
      <View style={baseStyles.rowBetween}>
        <Text style={styles.taskName}>Task name</Text>
        <Badge text="Priority" />
      </View>
      <View style={baseStyles.rowBetween}>
        <Badge text="Group" outline />
        <Text>Time/deadline</Text>
      </View>
      <Task />
    </View>
  )
}
