import { StyleProp, Text, ViewStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

interface Props {
  text: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  icon: 'edit' | 'lock' | 'logout' | 'code'
}

export const CustomButton = ({ text, onPress, style, icon }: Props) => {
  return (
    <RectButton
      onPress={onPress}
      style={[
        {
          backgroundColor: 'gainsboro',
          flexDirection: 'row',
          borderRadius: 100,
          paddingVertical: 16,
          paddingHorizontal: 24
        },
        style
      ]}
    >
      <MaterialIcons name={icon} size={28} color="dimgrey" />
      <Text
        style={{
          fontSize: 18,
          color: 'dimgrey',
          fontWeight: '600',
          marginLeft: 12,
          flex: 1
        }}
      >
        {text}
      </Text>
    </RectButton>
  )
}
