import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles'
import { useEffect } from 'react'
import { useSignInGithubMutation } from '@redux/api/authApi'

export const OAuth = () => {
  const [signInGithub, { isSuccess, data }] = useSignInGithubMutation()

  const redirect = async () => {
    const supported = await Linking.canOpenURL(data?.url as string)
    if (!supported) return
    await Linking.openURL(data?.url as string)
  }

  useEffect(() => {
    if (isSuccess) redirect()
  }, [isSuccess])

  return (
    <View style={styles.oAuthContainer}>
      <Text style={{ fontSize: 12, marginTop: 24 }}>Or connect with:</Text>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <Image style={styles.logo} source={require('@assets/google.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signInGithub()}>
          <Image style={styles.logo} source={require('@assets/github.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
