import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'

export type UnauthStackParamList = {
  SignUpScreen: undefined
  SignInScreen: undefined
}
export type UnauthNavigationType =
  NativeStackNavigationProp<UnauthStackParamList>

export type AuthStackParamList = {
  Main: undefined
  TaskModal: { id?: string }
}
export type AuthNavigationType = NativeStackNavigationProp<AuthStackParamList>

export type TabParamList = {
  Home: undefined
  Group: undefined
  'Add Task': undefined
  Task: undefined
  Profile: undefined
}
