import 'react-native-url-polyfill/auto'
// TODO import * as Linking from 'expo-linking'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { Routes } from './src/routes'
import { Snackbar } from '@components'
import { store } from '@redux/store'
import { useContact } from '@hooks/useContact'
import { useEffect } from 'react'
import { useLocation } from '@hooks/useLocation'

export default function App() {
  const { requestLocationPermission } = useLocation()
  const { requestContactPermission } = useContact()

  useEffect(() => {
    requestLocationPermission()
    requestContactPermission()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Routes />
        <Snackbar />
      </Provider>
    </GestureHandlerRootView>
  )
}
