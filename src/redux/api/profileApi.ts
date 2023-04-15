import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '@custom-types/auth'
import snackbar from '@redux/slice/snackBarSlice'
import { supabase } from '@constants/supabase'

interface UploadPhotoPayload {
  path: string
  fileBody: FormData
}

interface UpdatePasswordPayload {
  oldPassword: string
  newPassword: string
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    uploadProfilePhoto: builder.mutation<string, UploadPhotoPayload>({
      async queryFn({ path, fileBody }, { dispatch }) {
        dispatch(snackbar.info({ message: 'Loading...' }))
        // upload
        const { error } = await supabase.storage
          .from('avatars')
          .upload(path, fileBody)
        if (error) return { error: { message: error.message } }

        // download - get url
        const { data, error: urlError } = await supabase.storage
          .from('avatars')
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10)
        if (urlError) return { error: { message: urlError.message } }

        // update profile
        const { error: updateError } = await supabase.auth.updateUser({
          data: { avatar_url: data.signedUrl }
        })
        if (updateError) return { error: { message: updateError.message } }
        dispatch(
          snackbar.show({ message: 'Profile picture successfully updated' })
        )

        return { data: 'success' }
      }
    }),
    updateName: builder.mutation<string, string>({
      async queryFn(payload) {
        const { error } = await supabase.auth.updateUser({
          data: { name: payload }
        })
        if (error) return { error: { message: error.message } }
        return { data: 'success' }
      }
    })
    // updatePassword: builder.mutation<string, UpdatePasswordPayload>({
    //   async queryFn({ newPassword, oldPassword }) {
    //     const { error } = await supabase.rpc('change_user_password', {
    //       current_plain_password: oldPassword,
    //       new_plain_password: newPassword
    //     })
    //     if (error) return { error: { message: error.message } }
    //     return { data: 'success' }
    //   }
    // })
  })
})

export const { useUploadProfilePhotoMutation, useUpdateNameMutation } =
  profileApi
