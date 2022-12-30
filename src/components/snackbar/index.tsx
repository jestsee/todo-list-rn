import { Text, View } from 'react-native'
import { styleColor, styleIcon, styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Variant } from '@custom-types/snackbar'

interface Props {
  variant?: Variant
  message: string
  dismissable?: boolean
  autoClose?: boolean
}

export const Snackbar: React.FC<Props> = ({
  variant = Variant.SUCCESS,
  message,
  dismissable
}) => {
  return (
    <SafeAreaView
      style={[styles.container, styleColor[variant as keyof typeof styleColor]]}
    >
      <View style={styles.info}>
        <MaterialIcons
          name={styleIcon[variant as keyof typeof styleIcon]}
          size={24}
          color="white"
          style={styles.separator}
        />
        <Text style={styles.text}>{message}</Text>
      </View>
      {dismissable && <MaterialIcons name="close" size={22} color="white" />}
    </SafeAreaView>
  )
}
