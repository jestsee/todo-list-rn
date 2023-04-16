import * as Notifications from 'expo-notifications'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View
} from 'react-native'
import { Task } from './task'
import { scheduleNotification } from 'src/notification'
import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'
import { useGetTasksQuery } from '@redux/api/taskApi'
import { useTaskFilter } from '@hooks/useTaskFilter'

interface Props {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export const TaskList = ({ onScroll }: Props) => {
  const { session } = useAuth()
  const { isFetching, isError, error, data, refetch } = useGetTasksQuery(
    session?.user.id as string
  )
  const { filteredTask } = useTaskFilter()

  useEffect(() => {
    if (session) refetch()
  }, [session])

  const setNotifications = async () => {
    const currentNotifications =
      await Notifications.getAllScheduledNotificationsAsync()

    if (currentNotifications.length > 0) return
    console.log('[initial setup notif]')
    data?.forEach(async (item) => {
      await scheduleNotification(item)
    })
  }

  useEffect(() => {
    setNotifications()
  }, [data])

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
