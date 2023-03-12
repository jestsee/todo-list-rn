import { FlatList, Text, View } from 'react-native'
import { Task } from './task'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useGetTasksQuery } from '@redux/api/taskApi'
import { useSelector } from 'react-redux'

export const TodoList = () => {
  const { isFetching, isError, error } = useGetTasksQuery()
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
