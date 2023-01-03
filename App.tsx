import 'react-native-url-polyfill/auto'
// TODO import * as Linking from 'expo-linking'
import { Provider } from 'react-redux'
import { Routes } from './src/routes'
import { Snackbar } from '@components'
import { store } from '@redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <Snackbar />
    </Provider>
  )
}
