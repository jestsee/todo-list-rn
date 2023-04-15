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
import { CustomError } from '@custom-types/auth'
import { scheduleNotification } from 'src/notification'
import snackbar from '@redux/slice/snackBarSlice'
import { dayjs } from '@hooks/useDayjs'

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
        const { data, error } = await addTask(newTask)
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Task successfully added' }))
        let notificationId: string | undefined
        if (data[0].deadline) {
          const diff = dayjs(data[0].deadline).diff(dayjs(), 'second')
          notificationId = await scheduleNotification({
            content: {
              title: data[0].title,
              body: `Due ${data[0].deadline}`
            },
            trigger: {
              seconds: diff - 3600 * 7
            }
          })
          console.log('notif Id:', notificationId, diff)
        }
        return { data: [{ ...data[0], notificationId }] }
      }
    }),
    updateTask: builder.mutation<UpdateTaskPayload, UpdateTaskPayload>({
      async queryFn(updatedTask, { dispatch }) {
        const { error } = await updateTask(updatedTask)
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Task successfully updated' }))
        return { data: updatedTask }
      }
    }),
    deleteTask: builder.mutation<string, string>({
      async queryFn(id, { dispatch }) {
        dispatch(snackbar.info({ message: 'Deleting task...' }))
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
