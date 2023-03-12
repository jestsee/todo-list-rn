import { Button, Chip } from '@components'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useAddTaskMutation, useUpdateTaskMutation } from '@redux/api/taskApi'
import { useEffect, useState } from 'react'
import { AuthStackParamList } from '@custom-types/route'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Subtask } from '@modules/task/components/subtask'
import { usePriorityChip } from './composables/usePriorityChip'
import useTask from '@modules/task/composables/useTask'

type Props = NativeStackScreenProps<AuthStackParamList, 'TaskModal'>

export const TaskModal = ({ route, navigation }: Props) => {
  const { params } = route
  const isEditing = () => params?.task !== undefined

  const [addTask, { isLoading, isSuccess }] = useAddTaskMutation()
  const [updateTask, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateTaskMutation()

  const { priority, switchPriority } = usePriorityChip()
  const [title, setTitle] = useState(params?.task?.title ?? '')

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
    check,
    uncheck,
    changeTaskAttribute,
    prepareTask
  } = useTask(params?.task)

  useEffect(() => {
    if (isSuccess || updateSuccess) navigation.goBack()
  }, [isSuccess, updateSuccess])

  useEffect(() => {
    changeTaskAttribute({ title, priority: priority.name })
  }, [title, priority])

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.taskTitle}
          placeholder="Task title "
          onChangeText={(text) => setTitle(text)}
          defaultValue={isEditing() ? params.task?.title : ''}
        />
        <Ionicons
          onPress={() => navigation.goBack()}
          name="ios-close"
          size={24}
        />
      </View>
      <View>
        <FlatList
          data={subtask}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index: idx }) => (
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
          )}
        />
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
          <FlatList
            data={checkedSubtask}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index: idx }) => (
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
            )}
          />
        </View>
      )}
      <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
        <Button
          title={isEditing() ? 'Update' : 'Save'}
          loading={isLoading || updateLoading}
          onPress={() =>
            isEditing() ? updateTask(prepareTask()) : addTask(prepareTask())
          }
        />
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: 'grey',
            paddingTop: 20,
            marginTop: 20
          }}
        />
        <Chip
          text={priority.name}
          color={priority.color.backgroundColor}
          onPress={switchPriority}
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
