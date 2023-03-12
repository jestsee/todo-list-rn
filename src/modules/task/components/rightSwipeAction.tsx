import { BaseButton } from 'react-native-gesture-handler'
import { Text } from 'react-native'

interface Props {
  onDelete: () => void
}
const RightSwipeActions = ({ onDelete }: Props) => {
  return (
    <BaseButton
      onPress={onDelete}
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20
        }}
      >
        Delete
      </Text>
    </BaseButton>
  )
}

export default RightSwipeActions
