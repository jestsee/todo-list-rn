import { Button, Form, PasswordForm } from '@components'
import { SignInPayload } from '@custom-types/auth'
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
  } = useForm<SignInPayload>({
    resolver: zodResolver(validationSchema.omit({ name: true }))
  })

  // if (isLoading) return <Text>Loading...</Text>
  if (isError) return <Text>{error?.message}</Text>
  if (isSuccess) return <Text>{data?.user?.email}</Text>

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
      <Button
        title="Submit"
        onPress={handleSubmit(signIn)}
        loading={isLoading}
      />
    </>
  )
}
