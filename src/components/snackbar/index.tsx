import { Text, View } from 'react-native'
import { styleColor, styleIcon, styles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Variant } from '@custom-types/snackbar'
import actions from '@redux/slice/snackBarSlice'
import { selectSnackbarState } from '@redux/slice/snackBarSlice'
import { useEffect } from 'react'

export const Snackbar = () => {
  const dispatch = useDispatch()
  const { hide } = actions
  const {
    message,
    show,
    dismissable,
    duration = 3,
    manualClose,
    variant = Variant.SUCCESS
  } = useSelector(selectSnackbarState)

  let timer: NodeJS.Timeout | undefined
  const handleTimeOut = () => {
    timer = setTimeout(() => {
      dispatch(hide())
    }, duration * 1000)
  }

  const handleClose = () => {
    clearTimeout(timer)
    dispatch(hide())
  }

  useEffect(() => {
    if (show && !manualClose) {
      console.log('masuk useEffect show', duration)
      handleTimeOut()
    }
    return () => {
      clearTimeout(timer)
    }
  }, [show, timer])

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
        {dismissable && (
          <MaterialIcons
            name="close"
            size={22}
            color="white"
            onPress={handleClose}
          />
        )}
      </SafeAreaView>
    )
  return <></>
}
