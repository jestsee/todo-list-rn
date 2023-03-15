import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { useState } from 'react'

export const useDatePicker = (existingDate?: string) => {
  const dateNow = new Date(Date.now())
  const [date, setDate] = useState(
    existingDate ? new Date(existingDate) : undefined
  )

  const onChange = (e: DateTimePickerEvent, date?: Date) => {
    if (e.type === 'set') setDate(date ?? dateNow)
    if (e.type === 'neutralButtonPressed') setDate(undefined)
  }

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      minimumDate: dateNow,
      value: date ?? dateNow,
      onChange,
      mode: currentMode,
      is24Hour: true,
      neutralButtonLabel: 'Clear'
    })
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return { showDatepicker, date }
}
