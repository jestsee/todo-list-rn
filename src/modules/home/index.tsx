import { Button } from '@components'
import { Text } from 'react-native'
import { useSignOutMutation } from '@redux/api/supabaseApi'

export const Home = () => {
  const [signOut, { isLoading }] = useSignOutMutation()

  return (
    <>
      <Text>ini home</Text>
      <Button title="Sign Out" loading={isLoading} onPress={() => signOut()} />
    </>
  )
}
