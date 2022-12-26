import { SafeAreaView } from 'react-native-safe-area-context'
import { SignUpForm } from './SignUpForm'
import { customPadding } from '@constants/styles'

export const SignUp = () => {
  return (
    <SafeAreaView style={{ padding: customPadding }}>
      <SignUpForm />
    </SafeAreaView>
  )
}
