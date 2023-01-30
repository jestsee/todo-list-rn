/* eslint-disable sort-keys */
import { ProfileResponse, getProfile } from './db/profile'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '@custom-types/auth'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      async queryFn() {
        const { data, error } = await getProfile()
        if (error) return { error: { message: error.message } }
        return { data }
      }
    })
    // TODO update profile
  })
})

export const { useGetProfileQuery } = profileApi
