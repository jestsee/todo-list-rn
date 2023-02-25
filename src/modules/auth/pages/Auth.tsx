import { Text, View } from 'react-native'
import { SignInForm } from '../components/SignInForm'
import { SignUpForm } from '../components/SignUpForm'
import { styles } from '../styles'
import { useNavigation } from '@react-navigation/native'
import { UnauthNavigationType } from '@custom-types/route'
import { OAuth } from '../components/OAuth'

export enum AuthType {
  signUp = 'Sign Up',
  signIn = 'Sign In'
}

interface Props {
  type: AuthType
}

export const Auth: React.FC<Props> = ({ type }) => {
  const { navigate } = useNavigation<UnauthNavigationType>()
  const signUp = (
    <>
      <Text style={styles.subtitle}>
        Please fill the details to create account
      </Text>
      <SignUpForm />
      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <Text onPress={() => navigate('SignInScreen')} style={styles.link}>
          Sign In
        </Text>
      </View>
    </>
  )

  const signIn = (
    <>
      <Text style={styles.subtitle}>
        Please login to continue using our app
      </Text>
      <SignInForm />
      <View style={styles.footer}>
        <Text>Don&apos;t have an account?</Text>
        <Text onPress={() => navigate('SignUpScreen')} style={styles.link}>
          Sign Up
        </Text>
      </View>
    </>
  )

  return (
    <View>
      <Text style={styles.title}>{type}</Text>
      {type === AuthType.signUp ? signUp : signIn}
      <OAuth />
    </View>
  )
}
