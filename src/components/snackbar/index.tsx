import { SnackbarProps, Variant } from '@custom-types/snackbar'
import { Text, View } from 'react-native'
import { styleColor, styleIcon, styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Snackbar: React.FC<SnackbarProps> = ({
  show,
  variant = Variant.SUCCESS,
  message,
  dismissable
}) => {
  if (show)
    return (
      <SafeAreaView
        style={[
          styles.container,
          styleColor[variant as keyof typeof styleColor]
        ]}
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
  return <></>
}
