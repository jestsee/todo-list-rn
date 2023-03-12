import { useEffect, useState } from 'react'
import { baseStyles } from '@constants/styles'

const priorityData = [
  { name: 'low', color: baseStyles.successColor },
  { name: 'medium', color: baseStyles.warnColor },
  { name: 'high', color: baseStyles.errorColor }
]

// TODO tambahin params buat existing priority (update task)
export const usePriorityChip = () => {
  const [index, setIndex] = useState(0)
  const [priority, setPriority] = useState(priorityData[0])

  const switchPriority = () => {
    setIndex((val) => val + 1)
  }

  useEffect(() => {
    setPriority(priorityData[index % 3])
  }, [index])

  return { switchPriority, priority }
}
