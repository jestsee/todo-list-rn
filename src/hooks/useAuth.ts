import { selectCurrentSession } from '@redux/slice/authSlice'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const session = useSelector(selectCurrentSession)

  return useMemo(() => ({ session }), [session])
}
