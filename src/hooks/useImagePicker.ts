import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export const useImagePicker = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0])
      return result.assets[0]
    }
  }

  return { image, pickImage }
}
