import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useAddTaskMutation, useUpdateTaskMutation } from '@redux/api/taskApi'
import { Button } from '@components'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Subtask } from '@modules/task/components/subtask'
import { Task } from '@custom-types/task'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useTask from '@modules/task/composables/useTask'

export const TaskModal = (task: Task) => {
  const navigation = useNavigation()
  const [addTask, { isLoading, isSuccess }] = useAddTaskMutation()
  const [updateTask, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateTaskMutation()

  const {
    subtask,
    add,
    insertAt,
    setSubtaskRef,
    editText,
    remove,
    checkedSubtask,
    insertChecked,
    setRefChecked,
    editTextChecked,
    removeChecked,
    changeTitle,
    check,
    uncheck,
    prepareTask
  } = useTask()

  useEffect(() => {
    if (isSuccess) navigation.goBack()
  }, [isSuccess])

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.taskTitle}
          placeholder="Task title "
          onChangeText={(text) => changeTitle(text)}
        />
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
      <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
        <Button
          title="Save"
          loading={isLoading}
          onPress={() => addTask(prepareTask())}
        />
      </View>
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
