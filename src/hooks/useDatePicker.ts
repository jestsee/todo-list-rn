import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { useState } from 'react'

type TaskMode = 'create' | 'edit'

export const useDatePicker = (existingDate?: string) => {
  const dateNow = new Date(Date.now())
  const [taskMode, setTaskMode] = useState<TaskMode>('create')
  const [date, setDate] = useState(
    existingDate ? new Date(existingDate) : undefined
  )

  const onChange = (e: DateTimePickerEvent, date?: Date) => {
    let _date: Date | undefined
    if (taskMode === 'edit' && date) {
      _date = new Date(date?.getTime() + 7 * 3600 * 1000)
    }

    if (e.type === 'set') setDate(_date ?? date ?? dateNow)
    if (e.type === 'neutralButtonPressed') setDate(undefined)
  }

  const showMode = (currentMode: 'date' | 'time') => {
    let _date: Date | undefined
    if (taskMode === 'edit' && date) {
      _date = new Date(date?.getTime() - 7 * 3600 * 1000)
    }
    DateTimePickerAndroid.open({
      minimumDate: dateNow,
      value: _date ?? date ?? dateNow,
      onChange,
      mode: currentMode,
      is24Hour: true,
      neutralButtonLabel: 'Clear'
    })
  }

  const showDatePicker = () => {
    showMode('date')
  }

  const showTimePicker = () => {
    showMode('time')
  }

  return { showDatePicker, showTimePicker, setTaskMode, date }
}
