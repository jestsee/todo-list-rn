import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { styles } from './styles'

interface Props {
  text?: string
  children?: React.ReactNode
  outline?: boolean
  style?: StyleProp<ViewStyle>
}

export const Badge: React.FC<Props> = (props) => {
  const { text, children, outline, style } = props
  return (
    <View
      style={[styles.container, outline ? styles.outline : styles.fill, style]}
    >
      <Text
        style={[styles.text, outline ? styles.textOutline : styles.textFill]}
      >
        {text}
      </Text>
      {children}
    </View>
  )
}
