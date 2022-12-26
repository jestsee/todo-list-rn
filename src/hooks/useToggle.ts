import { useState } from 'react'

export const useToggle = () => {
  const [show, setShow] = useState(false)

  const toggleClick = () => {
    setShow(!show)
  }

  return { show, toggleClick }
}
