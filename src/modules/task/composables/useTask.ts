import { Subtask, Task } from '@custom-types/task'
import { useEffect, useState } from 'react'
import { useAuth } from '@hooks/useAuth'
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
    useSubtask(false, task?.subtask)

  // for checked subtasks
  const {
    subtask: checkedSubtask,
    insertAt: insertChecked,
    add: addChecked,
    setSubtaskRef: setRefChecked,
    editText: editTextChecked,
    remove: removeChecked
  } = useSubtask(true, task?.subtask)

  const changeTaskAttribute = (prop: TaskProperty) => {
    setTaskProperty((val) => {
      return { ...val, ...prop }
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
    check,
    uncheck,
    changeTaskAttribute,
    prepareTask
  }
}

export default useTask
