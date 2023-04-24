import { StyleSheet } from 'react-native'
import { baseStyles } from '@constants/styles'

const gap = 16

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'darkgray',
    borderRadius: 4,
    borderWidth: 1,
    padding: 16
  },
  gap: {
    marginBottom: 8
  },
  taskContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  taskDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  taskInfoContainer: {
    ...baseStyles.rowBetween,
    marginBottom: gap
  },
  taskName: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold'
  },
  taskNameContainer: {
    ...baseStyles.rowBetween,
    marginBottom: gap * 0.5
  },
  taskText: {
    flex: 1,
    marginLeft: 12
  }
})
