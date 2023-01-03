import { ShowSnackbarPayload } from '@custom-types/snackbar'
import { useEffect } from 'react'
import { useSnackbar } from './useSnackbar'

type Payload = ShowSnackbarPayload & { isSuccess: boolean }

export const useSuccessSnackbar = ({ isSuccess, ...rest }: Payload) => {
  const { showSnackbar } = useSnackbar()
  useEffect(() => {
    if (isSuccess) showSnackbar(rest)
  }, [isSuccess])
}
