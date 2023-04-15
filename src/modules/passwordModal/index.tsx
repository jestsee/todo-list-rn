import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { Button, PasswordForm } from '@components'
import { UpdatePasswordPayload } from '@custom-types/profile'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useSnackbar } from '@hooks/useSnackbar'
import { useUpdatePasswordMutation } from '@redux/api/profileApi'
import validationSchema from './validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const PasswordModal = () => {
  const navigation = useNavigation()
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()
  const { infoSnackbar, showSnackbar, errorSnackbar } = useSnackbar()

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(validationSchema)
  })

  const _handleSubmit = handleSubmit((value) => {
    if (value.newPassword === value.oldPassword) {
      errorSnackbar({
        message: 'Password must be differ from old password'
      })
      return
    }
    infoSnackbar({ message: 'Loading...' })
    updatePassword(value)
      .unwrap()
      .then((response) => {
        if (response === 'success') {
          showSnackbar({
            message: 'Your password has been successfully updated'
          })
          navigation.goBack()
        }
      })
      .catch((error) => {
        console.error(error)
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
          <PasswordForm
            control={control}
            name="oldPassword"
            label="Old password"
            placeholder="Old password"
            error={errors.oldPassword}
            style={{ borderRadius: 8 }}
            touched={dirtyFields.oldPassword}
          />
          <PasswordForm
            control={control}
            name="newPassword"
            label="New password"
            placeholder="New password"
            error={errors.newPassword}
            style={{ borderRadius: 8 }}
            touched={dirtyFields.newPassword}
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
