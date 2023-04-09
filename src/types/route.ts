import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import { Task } from './task'

export type UnauthStackParamList = {
  SignUpScreen: undefined
  SignInScreen: undefined
}
export type UnauthNavigationType =
  NativeStackNavigationProp<UnauthStackParamList>

export type AuthStackParamList = {
  Main: undefined
  TaskModal: { task?: Task }
  FilterModal: undefined
  SortModal: undefined
  NameModal: undefined
  PasswordModal: undefined
}
export type AuthNavigationType = NativeStackNavigationProp<
  AuthStackParamList & TabParamList
>

export type TabParamList = {
  Home: undefined
  Contact: undefined
  'Add Task': undefined
  Task: undefined
  Profile: undefined
}
