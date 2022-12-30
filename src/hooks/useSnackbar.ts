/* eslint-disable sort-keys */
import { Duration, ShowSnackbarPayload, Variant } from '@custom-types/snackbar'
import actions from '@redux/slice/snackBarSlice'
import { useDispatch } from 'react-redux'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const { hide, show } = actions

  const showSnackbar = ({
    message,
    dismissable = false,
    duration = Duration.SHORT,
    manualClose = false,
    variant = Variant.SUCCESS
  }: ShowSnackbarPayload) => {
    console.log('snackbar called')
    dispatch(show({ message, dismissable, duration, manualClose, variant }))

    if (!manualClose)
      setTimeout(() => {
        dispatch(hide())
      }, duration * 1000)
  }

  const errorSnackbar = (payload: ShowSnackbarPayload) => {
    showSnackbar({ ...payload, variant: Variant.ERROR })
  }

  const warnSnackbar = (payload: ShowSnackbarPayload) => {
    showSnackbar({ ...payload, variant: Variant.WARN })
  }

  const infoSnackbar = (payload: ShowSnackbarPayload) => {
    showSnackbar({ ...payload, variant: Variant.INFO })
  }

  return { showSnackbar, errorSnackbar, warnSnackbar, infoSnackbar }
}
