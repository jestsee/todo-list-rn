import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { ContactTile } from './components/contactTile'
import { baseStyles } from '@constants/styles'
import { useContact } from '@hooks/useContact'
import { useEffect } from 'react'

export const Contact = () => {
  const { contacts, getContacts } = useContact()

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <SafeAreaView style={baseStyles.contentStyle}>
      <Text style={baseStyles.pageTitle}>Contacts</Text>
      <Text style={baseStyles.pageSubtitle}>
        You have {contacts.length} contact{contacts.length > 1 ? 's' : ''}
      </Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: { name, phoneNumbers } }) => (
          <ContactTile
            name={name}
            phoneNumber={phoneNumbers ? phoneNumbers[0].number : undefined}
          />
        )}
      />
    </SafeAreaView>
  )
}

const Separator = () => {
  return <View style={{ height: 12 }}></View>
}
