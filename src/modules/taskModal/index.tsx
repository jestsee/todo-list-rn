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
import { BaseButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import MapModal from './components/mapModal'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Priority } from '@custom-types/task'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Subtask } from '@modules/task/components/subtask'
import { capitalize } from 'src/utils'
import { useDatePicker } from '@hooks/useDatePicker'
import { useMarkerLocation } from './composables/useMarkerLocation'
import { useNavigation } from '@react-navigation/native'
import { usePriorityChip } from './composables/usePriorityChip'
import useTask from '@modules/task/composables/useTask'
import { useToggle } from '@hooks/useToggle'

type Props = NativeStackScreenProps<AuthStackParamList, 'TaskModal'>

export const TaskModal = ({ route, navigation }: Props) => {
  const { params } = route
  const { setOptions } = useNavigation()
  const isEditing = () => params?.task !== undefined

  const [addTask, { isLoading, isSuccess }] = useAddTaskMutation()
  const [updateTask, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateTaskMutation()

  const { show, toggleClick } = useToggle()
  const [title, setTitle] = useState(params?.task?.title ?? '')
  const { priority, switchPriority } = usePriorityChip(params?.task?.priority)
  const { showDatePicker, showTimePicker, setTaskMode, date } = useDatePicker(
    params?.task?.deadline
  )
  const { markerCoords, handleMarkerChange } = useMarkerLocation(
    params?.task?.latitude && params?.task?.longitude
      ? { latitude: params.task.latitude, longitude: params.task.longitude }
      : undefined
  )

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
    changeTaskAttribute({
      title,
      priority: priority.name as Priority,
      deadline: date?.toLocaleString(),
      latitude: markerCoords?.latitude,
      longitude: markerCoords?.longitude
    })
  }, [title, priority, date, markerCoords])

  useEffect(() => {
    if (isEditing()) setTaskMode('edit')
    setOptions({ headerShown: false })
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 18,
        paddingVertical: 8
      }}
    >
      <MapModal
        handleMarker={handleMarkerChange}
        marker={markerCoords}
        visible={show}
        onClose={toggleClick}
      />
      <View style={styles.titleContainer}>
        <TextInput
          multiline={true}
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
      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            data={subtask}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={Separator}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
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
            marginBottom: 12,
            marginTop: 16,
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
              ItemSeparatorComponent={Separator}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
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
      </View>
      <View
        style={{
          alignSelf: 'center',
          marginBottom: 12,
          width: '100%'
        }}
      >
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Chip
            text={capitalize(priority.name)}
            color={priority.color.backgroundColor}
            onPress={switchPriority}
            style={{ width: 100 }}
          />
          <View style={{ flexDirection: 'row' }}>
            <BaseButton onPress={showDatePicker} style={styles.attributeButton}>
              <Ionicons
                name="calendar-sharp"
                size={24}
                color={date ? 'dodgerblue' : 'dimgrey'}
              />
            </BaseButton>
            <Gap />
            <BaseButton onPress={showTimePicker} style={styles.attributeButton}>
              <Ionicons
                name="ios-time"
                size={24}
                color={date ? 'dodgerblue' : 'dimgrey'}
              />
            </BaseButton>
            <Gap />
            <BaseButton onPress={toggleClick} style={styles.attributeButton}>
              <Ionicons
                name="ios-location-sharp"
                size={24}
                color={markerCoords ? 'dodgerblue' : 'dimgrey'}
              />
            </BaseButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const Gap = () => {
  return <View style={{ width: 12 }}></View>
}
const Separator = () => {
  return <View style={{ height: 8 }}></View>
}

const styles = StyleSheet.create({
  attributeButton: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 100,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 20
  },
  taskTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
