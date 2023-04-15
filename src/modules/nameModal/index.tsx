import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { Button, Form } from '@components'
import { UpdateNamePayload } from '@custom-types/profile'
import { useAuth } from '@hooks/useAuth'
import { useForm } from 'react-hook-form'
import { useGetSessionQuery } from '@redux/api/authApi'
import { useNavigation } from '@react-navigation/native'
import { useSnackbar } from '@hooks/useSnackbar'
import { useUpdateNameMutation } from '@redux/api/profileApi'
import validationSchema from './validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const NameModal = () => {
  const navigation = useNavigation()
  const { refetch } = useGetSessionQuery()
  const { session } = useAuth()
  const [updateName, { isLoading }] = useUpdateNameMutation()
  const { infoSnackbar, showSnackbar } = useSnackbar()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateNamePayload>({
    defaultValues: { newName: session?.user.user_metadata['name'] },
    resolver: zodResolver(validationSchema)
  })

  const _handleSubmit = handleSubmit((value) => {
    infoSnackbar({ message: 'Loading...' })
    updateName(value.newName)
      .unwrap()
      .then((response) => {
        if (response === 'success') {
          showSnackbar({ message: 'Your name has been successfully updated' })
          refetch()
          navigation.goBack()
        }
      })
  })
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
          width: '86%',
          justifyContent: 'flex-end'
        }}
      >
        <View
          style={{
            padding: 32,
            backgroundColor: 'white',
            borderRadius: 24
          }}
        >
          <Form
            control={control}
            name="newName"
            label="New Name"
            placeholder="eg. John Doe"
            error={errors.newName}
            style={{ borderRadius: 8 }}
          />
          <Button
            loading={isLoading}
            style={{ marginTop: 12 }}
            title="Save"
            onPress={_handleSubmit}
          />
        </View>
      </Animated.View>
    </View>
  )
}
