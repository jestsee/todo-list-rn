import { useEffect, useState } from 'react'
import { Priority } from '@custom-types/task'
import { dayjs } from '@hooks/useDayjs'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { selectTaskFilter } from '@redux/slice/taskFilterSlice'
import { useSelector } from 'react-redux'

const priorityArr: Priority[] = ['low', 'medium', 'high']

export const useTaskFilter = () => {
  const tasks = useSelector(selectCurrentTasks)
  const filter = useSelector(selectTaskFilter)

  const [filteredTask, setFilteredTask] = useState(tasks)

  useEffect(() => {
    let tempTasks = tasks

    // search
    if (filter.search) {
      tempTasks = tempTasks.filter((item) =>
        item.title.includes(filter.search!)
      )
    }

    // select priority
    if (filter.priority) {
      tempTasks = tempTasks.filter((item) => item.priority === filter.priority)
    }

    // select date
    if (filter.date) {
      tempTasks = tempTasks.filter((item) => {
        const currentDate = new Date(item.deadline ?? 0)
        const filterDate = new Date(filter.date!)
        return currentDate.toDateString() === filterDate.toDateString()
      })
    }

    // sort
    if (filter.sort === 'closestDeadline') {
      tempTasks = tempTasks
        .slice()
        .sort((a, b) =>
          dayjs(a.deadline ?? '9999-12-31').isAfter(
            dayjs(b.deadline ?? '9999-12-31')
          )
            ? 1
            : -1
        )
    } else if (filter.sort === 'furthestDeadline') {
      tempTasks = tempTasks
        .slice()
        .sort((a, b) =>
          dayjs(a.deadline ?? '1800-12-31').isBefore(
            dayjs(b.deadline ?? '1800-12-31')
          )
            ? 1
            : -1
        )
    } else if (filter.sort === 'highestPriority') {
      tempTasks = tempTasks
        .slice()
        .sort(
          (b, a) =>
            priorityArr.indexOf(a.priority as Priority) -
            priorityArr.indexOf(b.priority as Priority)
        )
    } else {
      tempTasks = tempTasks
        .slice()
        .sort(
          (a, b) =>
            priorityArr.indexOf(a.priority as Priority) -
            priorityArr.indexOf(b.priority as Priority)
        )
    }

    setFilteredTask(tempTasks)
  }, [filter, tasks])

  return { filteredTask }
}
