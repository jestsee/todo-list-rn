import { Button, Search } from '@components'
import { Text, View } from 'react-native'
import { Task } from '@modules/task/components/task'
import { baseStyles } from '@constants/styles'
import { styles } from './styles'
import { useAuth } from '@hooks/useAuth'
import { useSignOutMutation } from '@redux/api/authApi'

export const Home = () => {
  const [signOut, { isLoading }] = useSignOutMutation()
  const { session } = useAuth()

  return (
    <>
      <View style={baseStyles.contentStyle}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>
              Hi, {session?.user.user_metadata['name']}!
            </Text>
            <Text style={styles.subtitle}>You have 10 ongoing tasks</Text>
          </View>
          <View style={styles.avatar}></View>
        </View>
        <Search />
        <View style={styles.middleContainer}>
          <Text style={styles.ongoingTask}>Ongoing Tasks</Text>
          <View style={styles.seeAllContainer}>
            <Text style={styles.seeAll}>See all</Text>
          </View>
        </View>
        {/* <Task /> */}
      </View>
      <Button title="Sign Out" loading={isLoading} onPress={() => signOut()} />
    </>
  )
}
