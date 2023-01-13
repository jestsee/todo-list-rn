/* eslint-disable sort-keys */
import { ShowSnackbarPayload } from '@custom-types/snackbar'
import actions from '@redux/slice/snackBarSlice'
import { useDispatch } from 'react-redux'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const { show, error, info, warn } = actions

  const showSnackbar = (payload: ShowSnackbarPayload) => {
    dispatch(show(payload))
  }

  const errorSnackbar = (payload: ShowSnackbarPayload) => {
    dispatch(error(payload))
  }

  const warnSnackbar = (payload: ShowSnackbarPayload) => {
    dispatch(warn(payload))
  }

  const infoSnackbar = (payload: ShowSnackbarPayload) => {
    dispatch(info(payload))
  }

  return { showSnackbar, errorSnackbar, warnSnackbar, infoSnackbar }
}
