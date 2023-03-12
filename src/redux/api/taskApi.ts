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
import snackbar from '@redux/slice/snackBarSlice'

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, void>({
      async queryFn() {
        const { data, error } = await getTasks()
        if (error) return { error: { message: error.message } }
        return { data }
      }
    }),
    addTask: builder.mutation<TasksResponse, AddTaskPayload>({
      async queryFn(newTask, { dispatch }) {
        const { data, error } = await addTask(newTask)
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Task successfully added' }))
        return { data }
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
