import { TextInput, View } from 'react-native'
import actions from '@redux/slice/taskFilterSlice'
import { styles } from './styles'
import { useDispatch } from 'react-redux'

export const Search = () => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchField}
        placeholder="Search task..."
        onChangeText={(text) => dispatch(actions.search(text))}
      />
    </View>
  )
}
