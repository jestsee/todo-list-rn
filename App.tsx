import 'react-native-url-polyfill/auto'
// TODO import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { Routes } from './src/routes'
import { Snackbar } from '@components'
import { store } from '@redux/store'
import { useEffect, useState } from 'react'

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>()
  const [errorMsg, setErrorMsg] = useState<string>()

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('error', errorMsg)
        setErrorMsg('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})

      setLocation(location)
    })()
  }, [])

  useEffect(() => {
    console.log('loc', location)
  }, [location])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Routes />
        <Snackbar />
      </Provider>
    </GestureHandlerRootView>
  )
}
