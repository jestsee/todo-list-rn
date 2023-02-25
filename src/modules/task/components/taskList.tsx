import { ScrollView, Text, View } from 'react-native'
import { Task } from './task'
import { useGetTasksQuery } from '@redux/api/taskApi'

export const TodoList = () => {
  const { data, isFetching, isError, error } = useGetTasksQuery()

  if (isFetching) return <Text>Loading</Text>
  if (isError) return <Text>{error.message}</Text>
  return (
    <ScrollView>
      {data?.map((item, idx) => (
        <Task
          key={item.id}
          style={{ marginBottom: idx !== data.length - 1 ? 16 : 0 }}
          {...item}
        />
      ))}
    </ScrollView>
  )
}
