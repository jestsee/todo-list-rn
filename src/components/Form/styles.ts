import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%'
  },
  error: {
    color: 'red'
  },
  form: {
    borderColor: 'darkgrey',
    borderRadius: 16,
    borderWidth: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  input: {
    flex: 1,
    fontSize: 16
  },
  label: {
    paddingBottom: 4,
    paddingLeft: 8
  }
})
