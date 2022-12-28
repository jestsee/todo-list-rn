import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  active: {
    backgroundColor: 'dodgerblue'
  },
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16
  },
  disabled: {
    backgroundColor: 'darkgray'
  },
  loading: {
    marginRight: 6
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
