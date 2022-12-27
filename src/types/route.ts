import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'

export type RootStackParamList = {
  Home: undefined
  SignUp: undefined
  SignIn: undefined
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>
