import { Button, Search } from '@components'
import { Text, View } from 'react-native'
import { Todo } from '@modules/task/components/todo'
import { baseStyles } from '@constants/styles'
import { styles } from './styles'
import { useGetProfileQuery } from '@redux/api/profileApi'
import { useSignOutMutation } from '@redux/api/authApi'

export const Home = () => {
  const [signOut, { isLoading }] = useSignOutMutation()
  const { isFetching, data, isError, error } = useGetProfileQuery()

  // TODO skeleton loading
  // TODO bisa dibikin komponen general yang handle fetching error nya
  if (isFetching) return <Text>Loading</Text>
  if (isError) return <Text>{error.message}</Text>
  if (!data?.length) return <Text>Data is not loaded</Text>

  const [profile] = data

  return (
    <>
      <View style={baseStyles.contentStyle}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>Hi, {profile.name}!</Text>
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
