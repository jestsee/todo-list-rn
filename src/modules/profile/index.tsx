import { Image, Text, View } from 'react-native'
import { CustomButton } from './components/customButton'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useAuth } from '@hooks/useAuth'
import { useSelector } from 'react-redux'
import { useSignOutMutation } from '@redux/api/authApi'

export const Profile = () => {
  const { session } = useAuth()
  const tasks = useSelector(selectCurrentTasks)
  const [signOut, { isLoading }] = useSignOutMutation()

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 28
      }}
    >
      <View style={{ position: 'relative', width: 120 }}>
        <Image
          source={{ uri: session?.user.user_metadata['avatar_url'] }}
          style={{ width: 120, height: 120, borderRadius: 100 }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 2,
            right: 0,
            borderRadius: 100,
            backgroundColor: 'dodgerblue',
            padding: 8
          }}
        >
          <MaterialIcons name="edit" size={20} color="white" />
        </View>
      </View>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 20 }}>
        {session?.user.user_metadata['name']}
      </Text>
      <Text style={{ fontSize: 18, color: 'dimgrey' }}>
        {tasks.length} undone tasks
      </Text>
      <CustomButton icon="edit" text="Change name" style={{ marginTop: 42 }} />
      <CustomButton
        icon="lock"
        text="Change password"
        style={{ marginTop: 24 }}
      />
      <CustomButton
        icon="logout"
        text="Logout"
        style={{ marginTop: 24 }}
        onPress={signOut}
      />
    </SafeAreaView>
  )
}
