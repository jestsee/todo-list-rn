/* eslint-disable sort-keys */
import type {
  CustomError,
  SignInPayload,
  SignInResponse,
  SignUpPayload
} from '@custom-types/auth'
import { Provider, Session } from '@supabase/supabase-js'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import snackbar from '@redux/slice/snackBarSlice'
import { supabase } from '@constants/supabase'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignInResponse, SignUpPayload>({
      async queryFn({ name, ...rest }, { dispatch }) {
        const { data, error } = await supabase.auth.signUp({
          ...rest,
          options: { data: { name } }
        })
        if (error) return { error: { message: error.message } }
        dispatch(
          snackbar.show({
            message: `An email has been sent to ${data?.user?.email}, please check your email to complete the registration`,
            dismissable: true
          })
        )
        return { data }
      }
    }),
    signIn: builder.mutation<SignInResponse, SignInPayload>({
      async queryFn(credentials, { dispatch }) {
        const { data, error } = await supabase.auth.signInWithPassword(
          credentials
        )
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Successfully signed in' }))
        return { data }
      }
    }),
    signInGithub: builder.mutation<{ provider: Provider; url?: string }, void>({
      async queryFn() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: { redirectTo: 'io.supabase.todolist://login-callback/' }
        })
        if (error) return { error: { message: error.message } }
        return { data }
      }
    }),
    signOut: builder.mutation<string, void>({
      async queryFn(_, { dispatch }) {
        dispatch(snackbar.info({ message: 'Loading...' }))
        const { error } = await supabase.auth.signOut()
        if (error) return { error: { message: error.message } }
        dispatch(snackbar.show({ message: 'Signed out' }))
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
} = authApi
