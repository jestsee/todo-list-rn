import { Form, Button } from '@components';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

// import './styles.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-300 text-red-500">
      <StatusBar style="auto" />
      <Text className="text-4xl">Sign In</Text>
      <Text>Please sign in to using our app</Text>
      <Form/>
      <Button/>
    </View>
  );
}
