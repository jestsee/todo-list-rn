import { StyleSheet } from 'react-native'

// colors
export const Red = '#ff0000'

// styles
export const baseStyles = StyleSheet.create({
  contentStyle: { flex: 1, justifyContent: 'center', padding: 32 },
  errorColor: { backgroundColor: 'red' },
  infoColor: { backgroundColor: 'lightslategrey' },
  successColor: { backgroundColor: 'mediumseagreen' },
  warnColor: { backgroundColor: 'darkorange' }
})
