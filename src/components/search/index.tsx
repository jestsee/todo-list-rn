import { TextInput, View } from 'react-native'
import { styles } from './styles'

export const Search = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchField} placeholder="Search task..." />
    </View>
  )
}
