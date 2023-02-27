import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native'
import { forwardRef, useState } from 'react'
import { Checkbox } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles/styles'

interface Props {
  text?: string
  checked?: boolean
  placeholder?: string
  style?: StyleProp<ViewStyle>
  onRemove?: (event: GestureResponderEvent) => void
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
  onChangeText?: (text: string) => void
  onPress?: (event: GestureResponderEvent) => void
}

const Subtask = forwardRef<TextInput, Props>((props, ref) => {
  const {
    text,
    style,
    placeholder,
    onRemove,
    onSubmit,
    onChangeText,
    onPress,
    ...rest
  } = props
  const [focus, setFocus] = useState(false)
  return (
    <View
      style={[styles.taskContainer, style, { justifyContent: 'space-between' }]}
    >
      <View style={{ flexDirection: 'row' }}>
        <Checkbox onPress={onPress} {...rest} />
        <TextInput
          style={[styles.taskText, rest.checked ? styles.taskDone : undefined]}
          defaultValue={text}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          blurOnSubmit={false}
          ref={ref}
        />
      </View>
      {focus && (
        <TouchableHighlight>
          <Ionicons onPress={onRemove} name="ios-close" size={16} />
        </TouchableHighlight>
      )}
    </View>
  )
})

Subtask.displayName = 'Subtask'
export { Subtask }
