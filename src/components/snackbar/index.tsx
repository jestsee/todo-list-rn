import { Animated, Text } from 'react-native'
import { styleColor, styleIcon, styles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Variant } from '@custom-types/snackbar'
import actions from '@redux/slice/snackBarSlice'
import { selectSnackbarState } from '@redux/slice/snackBarSlice'
import { useAnimSlide } from '@hooks/useAnimSlide'
import { useEffect } from 'react'

export const Snackbar = () => {
  const dispatch = useDispatch()
  const { slideAnim, slideUp, slideDown } = useAnimSlide({
    initialValue: 100,
    slideDownValue: 1000,
    slideUpValue: 0
  })
  const { hide } = actions
  const {
    message,
    show,
    dismissable = false,
    duration = 2,
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
    if (show && !dismissable) {
      handleTimeOut()
    }
    return () => {
      clearTimeout(timer)
    }
  }, [show, timer])

  useEffect(() => {
    if (show) return slideUp()
    slideDown()
  })

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          styles.container,
          styleColor[variant as keyof typeof styleColor],
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <MaterialIcons
          name={styleIcon[variant as keyof typeof styleIcon]}
          size={24}
          color="white"
          style={styles.prefix}
        />
        <Text style={styles.text}>{message}</Text>
        {dismissable && (
          <MaterialIcons
            name="close"
            size={22}
            color="white"
            onPress={handleClose}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  )
}
