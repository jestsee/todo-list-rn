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
      tempTasks = tempTasks.filter((item) =>
        item.title.includes(filter.search!)
      )
    }
    if (filter.priority) {
      tempTasks = tempTasks.filter((item) => item.priority === filter.priority)
    }
    if (filter.date) {
      tempTasks = tempTasks.filter((item) => {
        const currentDate = new Date(item.deadline ? item.deadline : 0)
        const filterDate = new Date(filter.date!)
        return currentDate.toDateString() === filterDate.toDateString()
      })
    }
    setFilteredTask(tempTasks)
  }, [filter, tasks])

  return { filteredTask }
}
