import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'

interface Props {
  text: string
  color?: string
  outline?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export const Chip = ({ text, color, onPress, style, outline }: Props) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[
          style,
          styles.container,
          {
            backgroundColor: !outline ? color ?? 'mediumseagreen' : undefined,
            borderColor: outline ? color ?? 'mediumseagreen' : undefined,
            borderWidth: outline ? 1.5 : undefined
          }
        ]}
      >
        <Text
          style={{
            color: !outline ? 'white' : color,
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center'
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    maxWidth: 100,
    paddingVertical: 8
  }
})
