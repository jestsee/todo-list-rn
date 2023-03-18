import 'dayjs/locale/id'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { Subtask } from '@modules/task/components/subtask'
import dayjs from 'dayjs'
import { useDatePicker } from '@hooks/useDatePicker'
import { useMarkerLocation } from './composables/useMarkerLocation'
import { usePriorityChip } from './composables/usePriorityChip'
import useTask from '@modules/task/composables/useTask'
import { useToggle } from '@hooks/useToggle'

type Props = NativeStackScreenProps<AuthStackParamList, 'TaskModal'>

export const TaskModal = ({ route, navigation }: Props) => {
  dayjs.locale('id')

  const { params } = route
  const isEditing = () => params?.task !== undefined

  const [addTask, { isLoading, isSuccess }] = useAddTaskMutation()
  const [updateTask, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateTaskMutation()

  const { show, toggleClick } = useToggle()
  const [title, setTitle] = useState(params?.task?.title ?? '')
  const { priority, switchPriority } = usePriorityChip(params?.task?.priority)
  const { showDatepicker, date } = useDatePicker(params?.task?.deadline)
  const { markerCoords, handleMarkerChange } = useMarkerLocation()

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
      priority: priority.name,
      deadline: date?.toDateString(),
      latitude: markerCoords?.latitude,
      longitude: markerCoords?.longitude
    })
  }, [title, priority, date, markerCoords])

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
          ItemSeparatorComponent={Separator}
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
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 20,
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Chip
            text={priority.name}
            color={priority.color.backgroundColor}
            onPress={switchPriority}
            style={{ width: 100 }}
          />
          <Gap />
          <BaseButton onPress={showDatepicker} style={styles.attributeButton}>
            <Ionicons name="calendar-sharp" size={20} color="dimgrey" />
            {date && (
              <Text
                style={{
                  color: 'dimgrey',
                  marginLeft: 8,
                  fontWeight: 'bold'
                }}
              >
                {dayjs(date).format('D MMM YYYY')}
              </Text>
            )}
          </BaseButton>
          <Gap />
          <BaseButton onPress={toggleClick} style={styles.attributeButton}>
            <Ionicons name="ios-location-sharp" size={24} color="dimgrey" />
            {markerCoords && (
              <Text
                style={{
                  color: 'dimgrey',
                  marginLeft: 8,
                  fontWeight: 'bold'
                }}
              >
                Selected
              </Text>
            )}
          </BaseButton>
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
    paddingHorizontal: 16
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
