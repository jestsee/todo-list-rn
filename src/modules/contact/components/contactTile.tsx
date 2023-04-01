import { StyleSheet, Text, View } from 'react-native'

interface Props {
  name: string
  phoneNumber?: string
}

export const ContactTile = ({ name, phoneNumber }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.initial}>{name[0]}</Text>
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phoneNumber ?? 'No phone number'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'lightgrey',
    borderRadius: 100,
    height: 56,
    justifyContent: 'center',
    marginRight: 16,
    width: 56
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  initial: {
    color: 'dimgrey',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  phone: {
    color: 'dimgrey',
    fontSize: 16
  }
})
