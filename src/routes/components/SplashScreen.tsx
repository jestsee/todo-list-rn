import { Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const SplashScreen = () => {
  return (
    <SafeAreaView>
      <Image
        style={{ height: 160, width: 160 }}
        source={require('@assets/react.png')}
      />
    </SafeAreaView>
  )
}
