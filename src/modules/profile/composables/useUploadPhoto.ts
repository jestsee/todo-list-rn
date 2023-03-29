import { useImagePicker } from '@hooks/useImagePicker'
import { useUploadProfilePhotoMutation } from '@redux/api/profileApi'

export const useUploadPhoto = () => {
  const { pickImage } = useImagePicker()
  const [uploadPhotoMutation, { isLoading }] = useUploadProfilePhotoMutation()

  const uploadPhoto = async () => {
    const img = await pickImage()
    if (!img) return

    const ext = img.uri.substring(img.uri.lastIndexOf('.') + 1)
    const fileName = img.uri.replace(/^.*[\\/]/, '')

    console.log('[fileName-ext]', fileName, ext)

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
  }

  return { uploadPhoto, isLoading }
}
