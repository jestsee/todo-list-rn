import { Text, View } from 'react-native'
import { Search } from '@components'
import { baseStyles } from '@constants/styles'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { styles } from './styles'
import { useAuth } from '@hooks/useAuth'
import { useSelector } from 'react-redux'

export const Home = () => {
  const { session } = useAuth()
  const tasks = useSelector(selectCurrentTasks)

  return (
    <>
      <View style={baseStyles.contentStyle}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>
              Hi, {session?.user.user_metadata['name']}!
            </Text>
            <Text style={styles.subtitle}>
              You have {tasks.length} unfinished tasks
            </Text>
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
    </>
  )
}
