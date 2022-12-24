import { Form, Button } from '@components'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Sign In</Text>
      <Text>Please sign in to using our app</Text>
      <Form />
      <Button />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})
