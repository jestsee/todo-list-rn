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
      async queryFn(newTask) {
        const { data, error } = await addTask(newTask)
        if (error) return { error: { message: error.message } }
        return { data }
      }
    }),
    updateTask: builder.mutation<string, UpdateTaskPayload>({
      async queryFn(updatedTask) {
        const { error } = await updateTask(updatedTask)
        if (error) return { error: { message: error.message } }
        return { data: 'success' }
      }
    }),
    deleteTask: builder.mutation<string, string>({
      async queryFn(id) {
        const { error } = await deleteTask(id)
        if (error) return { error: { message: error.message } }
        return { data: 'success' }
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
