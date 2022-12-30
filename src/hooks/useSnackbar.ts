import { selectSnackbarState, setSnackbar } from '@redux/slice/snackBarSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const { show: showState } = useSelector(selectSnackbarState)
  const show = useMemo(() => showState, [showState])

  const showSnackbar = () => {
    dispatch(setSnackbar({ show: true }))
    // setTimeout(() => {
    //   dispatch(setSnackbar({ show: false }))
    // }, 3000) // LONG SHORT ...
  }

  return { show, showSnackbar }
}
