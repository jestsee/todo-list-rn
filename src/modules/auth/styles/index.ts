import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  link: {
    color: 'dodgerblue',
    fontWeight: 'bold',
    marginLeft: 4
  },
  logo: { height: 60, margin: 12, width: 60 },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16
  },
  oAuthContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    marginBottom: 16,
    marginTop: 2,
    textAlign: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
