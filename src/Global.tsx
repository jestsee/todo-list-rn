import { Routes } from './routes'
import { Snackbar } from '@components'
import { SplashScreen } from '@modules/splashScreen'
import { selectSnackbarState } from '@redux/slice/snackBarSlice'
import { useGetSessionQuery } from '@redux/api/supabaseApi'
import { useSelector } from 'react-redux'

export const Global = () => {
  const snackbarState = useSelector(selectSnackbarState)
  const { isFetching } = useGetSessionQuery()

  if (isFetching) {
    return <SplashScreen />
  }

  return (
    <>
      <Routes />
      <Snackbar {...snackbarState} />
    </>
  )
}
