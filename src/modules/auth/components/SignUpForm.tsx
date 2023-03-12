import { Button, Form, PasswordForm } from '@components'
import { SignUpPayload as Payload } from '@custom-types/auth'
import { useForm } from 'react-hook-form'
import { useSignUpMutation } from '@redux/api/authApi'
import { validationSchema } from '../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<Payload>({
    resolver: zodResolver(validationSchema)
  })
  const [signUp, { isLoading }] = useSignUpMutation()

  return (
    <>
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
      <Button
        title="Sign up"
        onPress={handleSubmit(signUp)}
        loading={isLoading}
      />
    </>
  )
}
