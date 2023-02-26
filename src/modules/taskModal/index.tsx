import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Subtask } from '@modules/task/components/subtask'
import { useNavigation } from '@react-navigation/native'
import useSubtask from '@modules/task/compose/useSubtask'

export const TaskModal = () => {
  const navigation = useNavigation()
  const { subtask, add, insertAt, setSubtaskRef, editText } = useSubtask()

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <TextInput style={styles.taskTitle} placeholder="Task title " />
        <Ionicons
          onPress={() => navigation.goBack()}
          name="ios-close"
          size={24}
        />
      </View>
      <View>
        {subtask.map((item, idx) => (
          <Subtask
            key={idx}
            placeholder="Subtask"
            onSubmit={() => insertAt(idx + 1)}
            ref={(e) => setSubtaskRef(idx, e ?? undefined)}
            onChangeText={(val) => editText(idx, val)}
            {...item}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginVertical: 12,
          alignItems: 'center'
        }}
        onPress={() => add()}
      >
        <>
          <FontAwesome5 name="plus" size={12} color="grey" />
          <Text style={{ marginLeft: 10, color: 'grey' }}>New subtask</Text>
        </>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
