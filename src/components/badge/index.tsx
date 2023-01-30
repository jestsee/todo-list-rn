import { Text, View } from 'react-native'
import { styles } from './styles'

interface Props {
  text?: string
  children?: React.ReactNode
  outline?: boolean
}

export const Badge: React.FC<Props> = (props) => {
  const { text, children, outline } = props
  return (
    <View style={[styles.container, outline ? styles.outline : styles.fill]}>
      <Text
        style={[styles.text, outline ? styles.textOutline : styles.textFill]}
      >
        {text}
      </Text>
      {children}
    </View>
  )
}
