import { StyleSheet, Text } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'

interface Props {
  text: string
  color?: string
  onPress?: () => void
}

export const Chip = ({ text, color, onPress }: Props) => {
  return (
    <BaseButton
      onPress={onPress}
      style={[styles.container, { backgroundColor: color ?? 'mediumseagreen' }]}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 12,
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
