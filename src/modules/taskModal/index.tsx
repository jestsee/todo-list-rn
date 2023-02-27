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
import { Subtask as SubtaskType } from '@custom-types/task'
import { useNavigation } from '@react-navigation/native'
import useSubtask from '@modules/task/compose/useSubtask'

export const TaskModal = () => {
  const navigation = useNavigation()
  const { subtask, add, insertAt, setSubtaskRef, editText, remove } =
    useSubtask()

  const {
    subtask: checkedSubtask,
    insertAt: insertChecked,
    add: addChecked,
    setSubtaskRef: setRefChecked,
    editText: editTextChecked,
    remove: removeChecked
  } = useSubtask(true)

  const check = (idx: number, item: SubtaskType) => {
    remove(idx)
    addChecked(item)
  }

  const uncheck = (idx: number, item: SubtaskType) => {
    removeChecked(idx)
    add(item)
    console.log(checkedSubtask)
  }

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
            onPress={() => check(idx, item)}
            onRemove={() => remove(idx)}
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
      {checkedSubtask.length > 0 && (
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: 'grey',
            paddingTop: 20,
            marginTop: 16
          }}
        >
          {checkedSubtask.map((item, idx) => (
            <Subtask
              key={idx}
              placeholder="Subtask"
              onSubmit={() => insertChecked(idx + 1)}
              ref={(e) => setRefChecked(idx, e ?? undefined)}
              onChangeText={(val) => editTextChecked(idx, val)}
              onPress={() => uncheck(idx, item)}
              onRemove={() => removeChecked(idx)}
              {...item}
            />
          ))}
        </View>
      )}
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
