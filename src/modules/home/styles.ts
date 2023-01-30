import { StyleSheet } from 'react-native'
import { baseStyles } from '@constants/styles'

const gap = 28

export const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'darkgray',
    borderRadius: 100,
    height: 80,
    width: 80
  },
  container: {
    flex: 1
  },
  middleContainer: {
    marginBottom: gap / 2,
    marginTop: gap,
    ...baseStyles.rowBetween
  },
  ongoingTask: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  seeAll: {
    color: 'dodgerblue',
    fontSize: 18
  },
  seeAllContainer: {
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 1,
    paddingBottom: 1
  },
  subtitle: {
    fontSize: 18
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: gap
  }
})
