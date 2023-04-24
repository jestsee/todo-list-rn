import { useEffect, useRef, useState } from 'react'
import { Subtask } from '@custom-types/task'
import { TextInput } from 'react-native'

type CustomTextInput = TextInput | undefined

const useSubtask = (subtaskType?: boolean, existingSubtask?: Subtask[]) => {
  const [isLastIdx, setIsLastIdx] = useState(false)
  const subtaskRefs = useRef<CustomTextInput[]>([])
  const [subtask, setSubtask] = useState<Subtask[]>(
    existingSubtask?.filter((item) => item.checked === subtaskType) ?? []
  )

  useEffect(() => {
    subtaskRefs.current = subtaskRefs.current.slice(0, subtask.length)
  }, [subtask.length])

  useEffect(() => {
    if (isLastIdx) {
      subtaskRefs.current[subtask.length - 1]?.focus()
      setIsLastIdx(false)
    }
  }, [subtaskRefs.current.length, isLastIdx])

  useEffect(() => {
    if (!subtaskType && !existingSubtask) add()
  }, [])

  const setSubtaskRef = (idx: number, e?: TextInput) => {
    subtaskRefs.current[idx] = e
  }

  const insertAt = (
    idx: number,
    newSubtask: Subtask = { checked: subtaskType, text: '' }
  ) => {
    const tempSubtask = [...subtask]
    tempSubtask.splice(idx, 0, { ...newSubtask, checked: subtaskType })
    setSubtask(tempSubtask)

    if (idx != subtask.length) {
      subtaskRefs.current[idx]?.focus()
      return
    }
    setIsLastIdx(true)
  }

  const add = (newSubtask?: Subtask) => {
    insertAt(subtask.length, newSubtask)
  }

  const editText = (idx: number, newText: string) => {
    setSubtask((prevSubtask) => {
      return prevSubtask.map((item, i) => {
        if (i === idx) return { ...item, text: newText }
        return item
      })
    })
    console.log('masoook', subtask)
  }

  const editCheck = (idx: number) => {
    setSubtask((prevSubtask) => {
      const newSubtask = [...prevSubtask]
      newSubtask[idx].checked = !newSubtask[idx].checked
      return newSubtask
    })
  }

  const remove = (idx: number) => {
    // subtaskRefs.current[idx]?.blur()
    const tempSubtask = [...subtask]
    tempSubtask.splice(idx, 1)
    setSubtask(tempSubtask)
  }

  return {
    subtask,
    insertAt,
    add,
    editText,
    editCheck,
    remove,
    setSubtaskRef
  }
}

export default useSubtask
