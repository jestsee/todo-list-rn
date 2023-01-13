/* eslint-disable sort-keys */
import { Animated } from 'react-native'
import { useRef } from 'react'

interface SlideAnimParam {
  initialValue: number
  slideUpValue: number
  slideDownValue: number
}

export const useAnimSlide = (param: SlideAnimParam) => {
  const { initialValue, slideDownValue, slideUpValue } = param
  const slideAnim = useRef(new Animated.Value(initialValue)).current

  const slideUp = () => {
    Animated.timing(slideAnim, {
      duration: 250,
      toValue: slideUpValue,
      useNativeDriver: true
    }).start()
  }

  const slideDown = () => {
    Animated.timing(slideAnim, {
      duration: 250,
      toValue: slideDownValue,
      useNativeDriver: true
    }).start()
  }

  return { slideAnim, slideUp, slideDown }
}
