import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'

interface Props {
  text: string
  color?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export const Chip = ({ text, color, onPress, style }: Props) => {
  return (
    <BaseButton
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: color ?? 'mediumseagreen' },
        style
      ]}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 14,
          textAlign: 'center'
        }}
      >
        {text}
      </Text>
    </BaseButton>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    maxWidth: 100,
    paddingVertical: 8
  }
})
