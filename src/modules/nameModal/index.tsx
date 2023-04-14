import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, Form } from '@components'
import { UpdateNamePayload } from '@custom-types/profile'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import validationSchema from './validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const NameModal = () => {
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<UpdateNamePayload>({
    resolver: zodResolver(validationSchema)
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
            style={{ marginTop: 12 }}
            title="Update"
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>
      </Animated.View>
    </View>
  )
}
