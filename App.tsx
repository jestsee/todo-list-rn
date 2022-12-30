import 'react-native-url-polyfill/auto'
import { Global } from './src/Global'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Global />
    </Provider>
  )
}
