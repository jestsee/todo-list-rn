import * as Contacts from 'expo-contacts'
import { useState } from 'react'

export const useContact = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  const [status, setStatus] = useState<Contacts.PermissionStatus>()
  const [loading, setLoading] = useState(false)

  const requestContactPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    setStatus(status)
    console.log('Contact permission', status)
  }

  const getContacts = async () => {
    if (status === 'granted') {
      // TODO show snackbar kalo permission nya belum alowed
      return
    }
    setLoading(true)
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers
      ]
    })
    setContacts(data)
    setLoading(false)
  }

  return { requestContactPermission, getContacts, contacts, loading }
}
