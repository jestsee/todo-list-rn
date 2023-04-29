/* eslint-disable react-native/sort-styles */
/* eslint-disable sort-keys */
import { StyleSheet } from 'react-native'

// colors
export const Red = '#ff0000'

// styles
export const baseStyles = StyleSheet.create({
  contentStyle: {
    flex: 1,
    padding: 18
  },

  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  pageSubtitle: {
    fontSize: 18,
    color: 'dimgrey',
    marginBottom: 24
  },

  errorColor: { backgroundColor: 'red' },
  infoColor: { backgroundColor: 'lightslategrey' },
  successColor: { backgroundColor: 'mediumseagreen' },
  warnColor: { backgroundColor: 'darkorange' },

  rowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
