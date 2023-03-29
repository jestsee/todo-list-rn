import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '@custom-types/auth'
import snackbar from '@redux/slice/snackBarSlice'
import { supabase } from '@constants/supabase'

interface UploadPhotoPayload {
  path: string
  fileBody:
  | string
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | Buffer
  | File
  | FormData
  | NodeJS.ReadableStream
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    uploadProfilePhoto: builder.mutation<string, UploadPhotoPayload>({
      async queryFn({ path, fileBody }, { dispatch }) {
        dispatch(snackbar.info({ message: 'Loading...' }))
        try {
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

          console.log('url', data.signedUrl)

          // update profile
          const { error: updateError } = await supabase.auth.updateUser({
            data: { avatar_url: data.signedUrl }
          })
          if (updateError) return { error: { message: updateError.message } }
          dispatch(
            snackbar.show({ message: 'Profile picture successfully updated' })
          )
        } catch (error) {
          console.error(error)
        }
        return { data: 'success' }
      }
    })
    // TODO update profile
  })
})

export const { useUploadProfilePhotoMutation } = profileApi
