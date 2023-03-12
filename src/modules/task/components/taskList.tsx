import { ScrollView, Text } from 'react-native'
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
    <ScrollView>
      {tasks?.map((item, idx) => (
        <Task
          key={item.id}
          style={{ marginBottom: idx !== tasks.length - 1 ? 16 : 0 }}
          {...item}
        />
      ))}
    </ScrollView>
  )
}
