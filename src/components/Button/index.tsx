import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { styles } from './styles'

interface Props {
  title: string
  loading?: boolean
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

export const Button: React.FC<Props> = ({
  loading,
  title,
  onPress,
  disabled
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.container,
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
