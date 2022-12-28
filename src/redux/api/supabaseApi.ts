/* eslint-disable sort-keys */
import type {
  AuthError,
  SignInPayload,
  SignInResponse
} from '@custom-types/auth'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '@constants/supabase'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery<AuthError>(),
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInPayload>({
      async queryFn(credentials) {
        const { data, error } = await supabase.auth.signInWithPassword(
          credentials
        )
        if (error) return { error: { message: error.message } }
        return { data }
      }
    })
  })
})

export const { useSignInMutation } = supabaseApi
