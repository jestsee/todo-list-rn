import { ActivityIndicator, Image, Text, View } from 'react-native'
import { CustomButton } from './components/customButton'
import { MaterialIcons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { selectCurrentTasks } from '@redux/slice/tasksSlice'
import { useAuth } from '@hooks/useAuth'
import { useSelector } from 'react-redux'
import { useSignOutMutation } from '@redux/api/authApi'
import { useState } from 'react'
import { useUploadPhoto } from './composables/useUploadPhoto'

export const Profile = () => {
  const { session } = useAuth()
  const tasks = useSelector(selectCurrentTasks)
  const [signOut] = useSignOutMutation()
  const { uploadPhoto } = useUploadPhoto()

  const [loading, setLoading] = useState(false)

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
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator size={40} />
          </View>
        )}
        <RectButton
          onPress={uploadPhoto}
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
        </RectButton>
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
