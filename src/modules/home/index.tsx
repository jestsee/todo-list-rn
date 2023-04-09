import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { AuthNavigationType } from '@custom-types/route'
import { Search } from '@components'
import { TaskList } from '@modules/task/components/taskList'
import { baseStyles } from '@constants/styles'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { styles } from './styles'
import { useAuth } from '@hooks/useAuth'
import { useGetTasksQuery } from '@redux/api/taskApi'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export const Home = () => {
  const { session } = useAuth()
  const tasks = useSelector(selectCurrentTasks)
  const { navigate } = useNavigation<AuthNavigationType>()
  const { isLoading } = useGetTasksQuery(session?.user.id as string)

  return (
    <SafeAreaView style={baseStyles.contentStyle}>
      <View style={{ marginBottom: 32 }}>
        <Text style={styles.title}>
          Hi, {session?.user.user_metadata['name']}!
        </Text>
        <Text style={styles.subtitle}>
          {isLoading ? 'Loading...' : `You have ${tasks.length} tasks`}
        </Text>
      </View>
      <Search />
      <View style={styles.middleContainer}>
        <Text style={styles.ongoingTask}>Tasks</Text>
        <TouchableOpacity
          style={styles.seeAllContainer}
          onPress={() => navigate('Task')}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <TaskList />
    </SafeAreaView>
  )
}
