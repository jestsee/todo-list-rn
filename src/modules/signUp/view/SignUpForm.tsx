import { Button, Text, View } from 'react-native'
import { Form, PasswordForm } from '@components'
import { styles } from './styles'
import { useForm } from 'react-hook-form'
import { validationSchema } from '../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

interface FormData {
  name: string
  email: string
  password: string
}

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema)
  })
  const onSubmit = (data: FormData) => console.log(data)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Please sign up to using our app</Text>
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
      <PasswordForm
        control={control}
        name="password"
        error={errors.password}
        touched={dirtyFields.password}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}
