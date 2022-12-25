import { Button, StyleSheet, View } from 'react-native'
import { Form } from '@components'
import { useForm } from 'react-hook-form'
import { validationSchema } from '../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

interface FormData {
  name: string
  email: string
  password: string
}

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema)
  })
  const onSubmit = (data: FormData) => console.log(data)

  return (
    <View style={styles.container}>
      <Form
        control={control}
        name="name"
        placeholder="John Doe"
        error={errors.name}
      />
      <Form
        control={control}
        name="email"
        placeholder="example@mail.com"
        error={errors.email}
      />
      <Form
        control={control}
        name="password"
        error={errors.password}
        password
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%' }
})
