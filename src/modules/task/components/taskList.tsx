import { FlatList, Text, View } from 'react-native'
import { Task } from './task'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useAuth } from '@hooks/useAuth'
import { useGetTasksQuery } from '@redux/api/taskApi'
import { useSelector } from 'react-redux'

export const TaskList = () => {
  const { session } = useAuth()
  const { isFetching, isError, error } = useGetTasksQuery(
    session?.user.id as string
  )
  const tasks = useSelector(selectCurrentTasks)

  if (isFetching) return <Text>Loading</Text>
  if (isError) return <Text>{error.message}</Text>
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Task {...item} />}
      ItemSeparatorComponent={Separator}
    />
  )
}

const Separator = () => {
  return <View style={{ height: 20 }} />
}
