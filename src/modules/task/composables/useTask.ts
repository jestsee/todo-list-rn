import { Subtask, Task } from '@custom-types/task'
import { useAuth } from '@hooks/useAuth'
import { useEffect, useState } from 'react'
import useSubtask from './useSubtask'

type TaskProperty = Omit<Task, 'id' | 'created_by' | 'subtask'>

const useTask = (task?: Task) => {
  const { session } = useAuth()
  const [taskProperty, setTaskProperty] = useState<TaskProperty>()

  useEffect(() => {
    if (task) setTaskProperty(task)
  }, [])

  // for unchecked subtasks
  const { subtask, add, insertAt, setSubtaskRef, editText, remove } =
    useSubtask()

  // for checked subtasks
  const {
    subtask: checkedSubtask,
    insertAt: insertChecked,
    add: addChecked,
    setSubtaskRef: setRefChecked,
    editText: editTextChecked,
    remove: removeChecked
  } = useSubtask(true)

  const changeTitle = (text: string) => {
    setTaskProperty((val) => {
      return { ...val, title: text }
    })
  }

  const check = (idx: number, item: Subtask) => {
    remove(idx)
    addChecked(item)
  }

  const uncheck = (idx: number, item: Subtask) => {
    removeChecked(idx)
    add(item)
  }

  const prepareTask = () => {
    return {
      ...taskProperty,
      title: taskProperty?.title ?? '',
      subtask: [...subtask, ...checkedSubtask],
      created_by: session!.user.id
    }
  }

  return {
    subtask,
    add,
    insertAt,
    setSubtaskRef,
    editText,
    remove,
    checkedSubtask,
    insertChecked,
    addChecked,
    setRefChecked,
    editTextChecked,
    removeChecked,
    changeTitle,
    check,
    uncheck,
    prepareTask
  }
}

export default useTask
