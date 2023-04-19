import {
  AddTaskPayload,
  TasksResponse,
  UpdateTaskPayload,
  addTask,
  deleteTask,
  getTasks,
  updateTask
} from './db/task'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  removeScheduledNotification,
  scheduleNotification
} from 'src/notification'
import { CustomError } from '@custom-types/auth'
import snackbar from '@redux/slice/snackBarSlice'

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, string>({
      async queryFn(userId) {
        const { data, error } = await getTasks(userId)
        if (error) return { error: { message: error.message } }
        return { data }
      }
    }),
    addTask: builder.mutation<TasksResponse, AddTaskPayload>({
      async queryFn(newTask, { dispatch }) {
        delete newTask.notificationId
        const { data, error } = await addTask(newTask)
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Task successfully added' }))

        // schedule notification
        const notificationId = await scheduleNotification(data[0])

        return { data: [{ ...data[0], notificationId }] }
      }
    }),
    updateTask: builder.mutation<UpdateTaskPayload, UpdateTaskPayload>({
      async queryFn(updatedTask, { dispatch }) {
        const notificationId = updatedTask.notificationId
        delete updatedTask.notificationId
        const { error } = await updateTask(updatedTask)
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Task successfully updated' }))

        // update notification
        await scheduleNotification({ ...updatedTask, notificationId })

        return { data: { ...updatedTask, notificationId } }
      }
    }),
    deleteTask: builder.mutation<
      string,
      { id: string; notificationId?: string }
    >({
      async queryFn({ id, notificationId }, { dispatch }) {
        dispatch(snackbar.info({ message: 'Deleting task...' }))

        if (notificationId) {
          await removeScheduledNotification(notificationId)
        }

        const { error } = await deleteTask(id)
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Task successfully deleted' }))
        return { data: id }
      }
    })
  })
})

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = taskApi
