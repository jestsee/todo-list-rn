import { Animated } from 'react-native'
import { useRef } from 'react'

export const useAnimFade = (initialValue?: boolean) => {
  const fadeAnim = useRef(new Animated.Value(initialValue ? 1 : 0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      duration: 250,
      toValue: 1,
      useNativeDriver: true
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      duration: 250,
      toValue: 0,
      useNativeDriver: true
    }).start()
  }

  return { fadeAnim, fadeIn, fadeOut }
}
