import { useEffect, useState } from 'react'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { selectTaskFilter } from '@redux/slice/taskFilterSlice'
import { useSelector } from 'react-redux'

export const useTaskFilter = () => {
  const tasks = useSelector(selectCurrentTasks)
  const filter = useSelector(selectTaskFilter)

  const [filteredTask, setFilteredTask] = useState(tasks)

  useEffect(() => {
    let tempTasks = tasks
    if (filter.search) {
      tempTasks = tasks.filter((item) => item.title.includes(filter.search!))
    }
    setFilteredTask(tempTasks)
  }, [filter, tasks])

  return { filteredTask }
}
