import { Address } from 'react-native-maps'

export const capitalize = (words: string, firstWordOnly?: boolean): string => {
  const tempWords = words.split(' ')

  if (firstWordOnly) {
    tempWords[0] = tempWords[0][0].toUpperCase() + tempWords[0].substring(1)
    return tempWords.join(' ')
  }

  return tempWords
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
}

export const addressToString = (address: Address) => {
  return `${address?.thoroughfare} ${address?.name}, ${address?.subLocality}, ${address?.subAdministrativeArea}, ${address?.postalCode}, ${address?.administrativeArea}, ${address?.country}`
}
