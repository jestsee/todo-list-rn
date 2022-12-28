import { Form, PasswordForm } from '@components'
import { Button } from 'react-native'
import { SignInPayload as Payload } from '@custom-types/auth'
import { Text } from 'react-native'
import { useForm } from 'react-hook-form'
import { useSignInMutation } from '@redux/api/supabaseApi'
import { validationSchema } from '../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const SignInForm = () => {
  const [signIn, { isLoading, isError, error, isSuccess, data }] =
    useSignInMutation()
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<Payload>({
    resolver: zodResolver(validationSchema.omit({ name: true }))
  })
  const onSubmit = (data: Payload) => console.log(data)

  if (isLoading) return <Text>Loading...</Text>
  if (isError) {
    console.log(error)
  }
  if (isSuccess) {
    console.log(data?.user?.email)
  }
  return (
    <>
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
      <Button title="Submit" onPress={handleSubmit(signIn)} />
    </>
  )
}
