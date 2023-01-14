import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox'
import { View } from 'react-native'

interface Props {
  children?: React.ReactNode
}
export const Checkbox: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <View>
      <ExpoCheckbox />
      {children}
    </View>
  )
}
