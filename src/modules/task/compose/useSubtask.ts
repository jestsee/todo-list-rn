import { useEffect, useRef, useState } from 'react'
import { Subtask } from '@custom-types/task'
import { TextInput } from 'react-native'

type CustomTextInput = TextInput | undefined

const useSubtask = (subtaskType?: boolean) => {
  const [subtask, setSubtask] = useState<Subtask[]>([])
  const subtaskRefs = useRef<CustomTextInput[]>([])

  useEffect(() => {
    subtaskRefs.current = subtaskRefs.current.slice(0, subtask.length)
    console.log(`[effect] ${subtaskRefs.current.length}`)
  }, [subtask.length])

  const setSubtaskRef = (idx: number, e?: TextInput) => {
    subtaskRefs.current[idx] = e
  }

  const insertAt = (
    idx: number,
    newSubtask: Subtask = { checked: subtaskType, text: '' }
  ) => {
    const tempSubtask = [...subtask]
    tempSubtask.splice(idx, 0, newSubtask)
    setSubtask(tempSubtask)

    console.log(`[insert] ${subtaskRefs.current[idx]}`)
    subtaskRefs.current[idx]?.focus()
  }

  const add = (newSubtask?: Subtask) => {
    insertAt(subtask.length, newSubtask)
  }

  const editText = (idx: number, newText: string) => {
    setSubtask((prevSubtask) => {
      const newSubtask = [...prevSubtask]
      newSubtask[idx].text = newText
      return newSubtask
    })
  }

  return {
    subtask,
    insertAt,
    add,
    editText,
    setSubtaskRef
  }
}

export default useSubtask
