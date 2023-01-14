import { Button, Search } from '@components'
import { Text, View } from 'react-native'
import { Todo } from '@modules/task/components/todo'
import { styles } from './styles'
import { useSignOutMutation } from '@redux/api/supabaseApi'

export const Home = () => {
  const [signOut, { isLoading }] = useSignOutMutation()

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>Hi, there!</Text>
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
        <Todo />
      </View>
      <Button title="Sign Out" loading={isLoading} onPress={() => signOut()} />
    </>
  )
}
