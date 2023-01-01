/* eslint-disable sort-keys */
import type {
  CustomError,
  SignInPayload,
  SignInResponse,
  SignUpPayload
} from '@custom-types/auth'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@constants/supabase'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignInResponse, SignUpPayload>({
      async queryFn({ name, ...rest }) {
        const { data, error } = await supabase.auth.signUp({
          ...rest,
          options: {
            data: {
              name
            }
          }
        })
        if (error) return { error: { message: error.message } }
        return { data }
      }
    }),
    signIn: builder.mutation<SignInResponse, SignInPayload>({
      async queryFn(credentials) {
        const { data, error } = await supabase.auth.signInWithPassword(
          credentials
        )
        if (error) return { error: { message: error.message } }
        return { data }
      }
    }),
    signOut: builder.mutation<string, void>({
      async queryFn() {
        const { error } = await supabase.auth.signOut()
        if (error) return { error: { message: error.message } }
        return { data: 'success' }
      }
    }),
    getSession: builder.query<{ session: Session | null }, void>({
      async queryFn() {
        const { data, error } = await supabase.auth.getSession()
        if (error) return { error: { message: error.message } }
        return { data }
      }
    })
  })
})

export const {
  useSignInMutation,
  useSignOutMutation,
  useGetSessionQuery,
  useSignUpMutation
} = supabaseApi
