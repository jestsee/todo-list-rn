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

type Location = { latitude: number; longitude: number }
const toRad = (v: number) => {
  return (v * Math.PI) / 180
}
export const haversine = (l1: Location, l2: Location) => {
  const R = 6371 // km
  const x1 = l2.latitude - l1.latitude
  const dLat = toRad(x1)
  const x2 = l2.longitude - l1.longitude
  const dLon = toRad(x2)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(l1.latitude)) *
    Math.cos(toRad(l2.latitude)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}
