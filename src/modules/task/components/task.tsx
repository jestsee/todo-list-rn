import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { Checkbox } from '@components'
import { styles } from '../styles/styles'

interface Props {
  text: string
  checked?: boolean
  style?: StyleProp<ViewStyle>
}

export const Task = ({ text, style, ...rest }: Props) => {
  return (
    <View style={[styles.taskContainer, style]}>
      <Checkbox {...rest} />
      <Text
        style={[styles.taskText, rest.checked ? styles.taskDone : undefined]}
      >
        {text}
      </Text>
    </View>
  )
}
