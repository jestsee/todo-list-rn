import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Button, Chip } from '@components'
import actions, { selectTaskFilter } from '@redux/slice/taskFilterSlice'
import { Ionicons } from '@expo/vector-icons'
import { Priority } from '@custom-types/task'
import { capitalize } from 'src/utils'
import { dayjs } from '@hooks/useDayjs'
import { priorityData } from '@modules/taskModal/composables/usePriorityChip'
import { useDatePicker } from '@hooks/useDatePicker'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export const FilterModal = () => {
  const navigation = useNavigation()
  const currentFilter = useSelector(selectTaskFilter)
  const { selectPriority, selectDate } = actions
  const dispatch = useDispatch()

  const { date, showDatePicker } = useDatePicker(currentFilter.date)
  const [priority, setPriority] = useState<Priority | undefined>(
    currentFilter.priority
  )
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          height: '50%',
          width: '100%',
          justifyContent: 'flex-end'
        }}
      >
        <View
          style={{
            padding: 32,
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}
          >
            <Text style={styles.filterTitle}>Priority</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(selectDate(undefined))
                dispatch(selectPriority(undefined))
                navigation.goBack()
              }}
            >
              <Text
                style={[
                  styles.filterTitle,
                  {
                    fontSize: 16,
                    color: 'dodgerblue',
                    textDecorationLine: 'underline'
                  }
                ]}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ marginBottom: 20 }}
            data={priorityData}
            horizontal={true}
            keyExtractor={(item) => item.name}
            renderItem={({ item: { name, color }, index }) => (
              <Chip
                text={capitalize(name)}
                color={color.backgroundColor}
                style={{ width: 100, marginRight: index < 2 ? 12 : 0 }}
                onPress={() => setPriority(name as typeof priority)}
                outline={priority != name}
              />
            )}
          />
          <Text style={[styles.filterTitle, { marginBottom: 16 }]}>Date</Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              marginBottom: 24,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderColor: 'lightgrey',
              borderWidth: 1.5,
              flexDirection: 'row',
              borderRadius: 8
            }}
          >
            <TextInput
              value={date ? dayjs(date).format('DD MMMM YYYY') : undefined}
              style={{ flex: 1, color: 'black' }}
              placeholder="Select a date"
              editable={false}
            />
            <Ionicons name="calendar-sharp" size={24} color="grey" />
          </TouchableOpacity>
          <Button
            title="Apply"
            onPress={() => {
              dispatch(selectPriority(priority))
              dispatch(selectDate(date?.toISOString()))
              navigation.goBack()
            }}
          />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  filterTitle: { fontSize: 20, fontWeight: 'bold' }
})
