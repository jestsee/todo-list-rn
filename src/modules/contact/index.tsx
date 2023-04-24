import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'
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
        nestedScrollEnabled
      />
    </SafeAreaView>
  )
}

const Separator = () => {
  return <View style={{ height: 12 }}></View>
}
