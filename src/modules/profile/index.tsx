import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { CustomButton } from './components/customButton'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { baseStyles } from '@constants/styles'
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
      style={[
        baseStyles.contentStyle,
        {
          alignItems: 'center'
        }
      ]}
    >
      <View style={{ position: 'relative', width: 120 }}>
        {!session?.user.user_metadata['avatar_url'] ? (
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={64}
              color="dimgrey"
              style={styles.personIcon}
            />
          </View>
        ) : (
          <Image
            source={{ uri: session?.user.user_metadata['avatar_url'] }}
            style={styles.avatar}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        )}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size={40} />
          </View>
        )}
        <RectButton onPress={uploadPhoto} style={styles.editIcon}>
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

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'lightgrey',
    borderRadius: 100,
    height: 120,
    width: 120
  },
  editIcon: {
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
    bottom: 2,
    padding: 8,
    position: 'absolute',
    right: 0
  },
  loading: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  personIcon: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }]
  }
})
