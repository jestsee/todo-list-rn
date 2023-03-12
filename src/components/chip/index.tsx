import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  text: string
  color?: string
  onPress?: () => void
}

export const Chip = ({ text, color, onPress }: Props) => {
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    maxWidth: 100,
    paddingVertical: 8
  }
})
