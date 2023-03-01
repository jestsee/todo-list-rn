import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { styles } from './styles'

interface Props {
  title: string
  loading?: boolean
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
}

export const Button: React.FC<Props> = ({
  loading,
  title,
  onPress,
  disabled,
  style
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.container,
        style,
        disabled || loading ? styles.disabled : styles.active
      ]}
    >
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={24} color="white" />
        </View>
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
