import { GestureResponderEvent, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
  checked?: boolean
  onPress?: (event: GestureResponderEvent) => void
}
export const Checkbox: React.FC<Props> = ({ checked, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <MaterialIcons
        name={checked ? 'check-box' : 'check-box-outline-blank'}
        size={25}
        color="darkgray"
      />
    </TouchableOpacity>
  )
}
