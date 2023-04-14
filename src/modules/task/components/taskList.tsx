import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View
} from 'react-native'
import { Task } from './task'
import { useAuth } from '@hooks/useAuth'
import { useGetTasksQuery } from '@redux/api/taskApi'
import { useTaskFilter } from '@hooks/useTaskFilter'

interface Props {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export const TaskList = ({ onScroll }: Props) => {
  const { session } = useAuth()
  const { isFetching, isError, error } = useGetTasksQuery(
    session?.user.id as string
  )
  const { filteredTask } = useTaskFilter()

  if (isFetching) return <Text>Loading</Text>
  if (isError) return <Text>{error.message}</Text>
  return (
    <FlatList
      onScroll={onScroll}
      data={filteredTask}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Task {...item} />}
      ItemSeparatorComponent={Separator}
    />
  )
}

const Separator = () => {
  return <View style={{ height: 20 }} />
}
