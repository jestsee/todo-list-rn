import type { Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { CustomError } from '@custom-types/auth'
import { Duration } from '@custom-types/snackbar'
import { ToastAndroid } from 'react-native'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import snackbar from '@redux/slice/snackBarSlice'

/**
 * Log a warning and show a toast!
 */
export const errorHandler: Middleware =
  (store: MiddlewareAPI) => (next) => (action: PayloadAction<CustomError>) => {
    if (isRejectedWithValue(action)) {
      console.log('middleware hit')

      store.dispatch(
        snackbar.error({
          duration: Duration.LONG,
          message: action.payload.message
        })
      )
      // ToastAndroid.show(action.payload.message, ToastAndroid.LONG)
    }
    return next(action)
  }
