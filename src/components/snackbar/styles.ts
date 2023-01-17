import { StyleSheet } from 'react-native'
import { baseStyles } from '@constants/styles'

export const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    position: 'absolute',
    width: '100%',
    ...baseStyles.rowBetween
  },
  prefix: {
    marginRight: 8
  },
  text: {
    color: 'white',
    flex: 1,
    fontSize: 15
  }
})

export const styleColor = {
  error: baseStyles.errorColor,
  info: baseStyles.infoColor,
  success: baseStyles.successColor,
  warn: baseStyles.warnColor
}

export const styleIcon: {
  error: 'error-outline'
  info: 'info-outline'
  success: 'check-circle-outline'
  warn: 'warning'
} = {
  error: 'error-outline',
  info: 'info-outline',
  success: 'check-circle-outline',
  warn: 'warning'
}
