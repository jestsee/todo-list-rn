import { StyleSheet, View } from 'react-native'
import { SignUp } from '@modules/signUp'

export default function App() {
  return (
    <View style={styles.container}>
      <SignUp />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 32
  }
})
