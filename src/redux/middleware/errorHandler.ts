import type { Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { CustomError } from '@custom-types/auth'
import { Duration } from '@custom-types/snackbar'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import snackbar from '@redux/slice/snackBarSlice'

/**
 * Log a warning and show a toast!
 */
export const errorHandler: Middleware =
  (store: MiddlewareAPI) => (next) => (action: PayloadAction<CustomError>) => {
    if (isRejectedWithValue(action)) {
      console.log('middleware hit', action.payload.message)

      store.dispatch(
        snackbar.error({
          duration: Duration.LONG,
          message: action.payload.message
        })
      )
    }
    return next(action)
  }
