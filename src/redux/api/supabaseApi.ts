/* eslint-disable sort-keys */
import type {
  CustomError,
  SignInPayload,
  SignInResponse,
  SignUpPayload
} from '@custom-types/auth'
import { Provider, Session } from '@supabase/supabase-js'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '@constants/supabase'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignInResponse, SignUpPayload>({
      async queryFn({ name, ...rest }) {
        const { data, error } = await supabase.auth.signUp({
          ...rest,
          options: { data: { name } }
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
    signInGithub: builder.mutation<{ provider: Provider; url?: string }, void>({
      async queryFn() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github'
        })
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
  useSignUpMutation,
  useSignInMutation,
  useSignInGithubMutation,
  useSignOutMutation,
  useGetSessionQuery
} = supabaseApi
