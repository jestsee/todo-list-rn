import type { Middleware, PayloadAction } from '@reduxjs/toolkit'
import { CustomError } from '@custom-types/auth'
import { ToastAndroid } from 'react-native'
import { isRejectedWithValue } from '@reduxjs/toolkit'

/**
 * Log a warning and show a toast!
 */
export const errorHandler: Middleware =
  () => (next) => (action: PayloadAction<CustomError>) => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!', action.payload.message)
      ToastAndroid.show(action.payload.message, ToastAndroid.LONG)
    }

    return next(action)
  }
