import { useGetSessionQuery } from '@redux/api/authApi'
import { useImagePicker } from '@hooks/useImagePicker'
import { useUploadProfilePhotoMutation } from '@redux/api/profileApi'

export const useUploadPhoto = () => {
  const { refetch } = useGetSessionQuery()
  const { pickImage } = useImagePicker()
  const [uploadPhotoMutation, { isLoading, isSuccess }] =
    useUploadProfilePhotoMutation()

  const uploadPhoto = async () => {
    const img = await pickImage()
    if (!img) return

    const ext = img.uri.substring(img.uri.lastIndexOf('.') + 1)
    const fileName = img.uri.replace(/^.*[\\/]/, '')

    const formData = new FormData()
    formData.append('files', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uri: img.uri,
      name: fileName,
      type: `image/${ext}`
    })

    uploadPhotoMutation({
      path: fileName,
      fileBody: formData
    })
      .unwrap()
      .then((data) => {
        if (data === 'success') refetch()
      })
  }

  return { uploadPhoto, isLoading }
}
