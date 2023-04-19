import * as Notifications from 'expo-notifications'
import { FlatList, ScrollViewProps, Text, View } from 'react-native'
import { Task } from './task'
import { scheduleNotification } from 'src/notification'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useAuth } from '@hooks/useAuth'
import { useEffect } from 'react'
import { useGetTasksQuery } from '@redux/api/taskApi'
import { useSelector } from 'react-redux'
import { useTaskFilter } from '@hooks/useTaskFilter'

interface Props extends ScrollViewProps {
  count?: number
}

export const TaskList = ({ count, ...props }: Props) => {
  const { session } = useAuth()
  const { filteredTask } = useTaskFilter()
  const tasks = useSelector(selectCurrentTasks)
  const { isFetching, isError, error, data, refetch } = useGetTasksQuery(
    session?.user.id as string
  )

  useEffect(() => {
    if (session && tasks.length === 0) refetch()
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
      data={count ? filteredTask.slice(0, count) : filteredTask}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Task {...item} />}
      ItemSeparatorComponent={Separator}
      {...props}
    />
  )
}

const Separator = () => {
  return <View style={{ height: 20 }} />
}
