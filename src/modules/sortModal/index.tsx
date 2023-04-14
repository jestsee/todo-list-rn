import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import actions, { selectTaskFilter } from '@redux/slice/taskFilterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { SortValue } from '@custom-types/task'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

interface SortOption {
  label: string
  value: SortValue
}

const sortOptions: SortOption[] = [
  {
    label: 'Closest deadline',
    value: 'closestDeadline'
  },
  {
    label: 'Furthest deadline',
    value: 'furthestDeadline'
  },
  {
    label: 'Highest priority',
    value: 'highestPriority'
  },
  {
    label: 'Lowest priority',
    value: 'lowestPriority'
  }
]

export const SortModal = () => {
  const navigation = useNavigation()
  const currentFilter = useSelector(selectTaskFilter)
  const dispatch = useDispatch()
  const [selectedSort, selectSort] = useState<SortValue>(currentFilter.sort)

  const { selectSort: sort } = actions
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
          <Text style={[styles.filterTitle, { marginBottom: 12 }]}>
            Sort task by
          </Text>
          <FlatList
            data={sortOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item: { label, value } }) => (
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor:
                    selectedSort === value ? 'lightsteelblue' : 'transparent',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 8
                }}
                onPress={() => selectSort(value)}
              >
                {selectedSort !== value ? (
                  <Ionicons
                    name="radio-button-off"
                    size={20}
                    color="black"
                    style={{ marginRight: 12 }}
                  />
                ) : (
                  <Ionicons
                    name="radio-button-on"
                    size={20}
                    color="black"
                    style={{ marginRight: 12 }}
                  />
                )}
                <Text>{label}</Text>
              </TouchableOpacity>
            )}
          />
          <Button
            style={{ marginTop: 20 }}
            title="Apply"
            onPress={() => {
              dispatch(sort(selectedSort))
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
