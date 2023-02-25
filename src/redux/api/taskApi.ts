import { TasksResponse, getTasks } from './db/task'
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
    })
  })
})

export const { useGetTasksQuery } = taskApi
