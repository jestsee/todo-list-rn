import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useState } from 'react'

export const useScroll = () => {
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState<'down' | 'up'>('down')
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const tempDirection = currentOffset > offset ? 'down' : 'up'
    setOffset(currentOffset)
    setDirection(tempDirection)
    console.log(tempDirection) // up or down accordingly
  }

  return { handleScroll, direction }
}
