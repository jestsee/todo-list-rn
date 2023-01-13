import { Button, Form, PasswordForm } from '@components'
import { SignInPayload } from '@custom-types/auth'
import { useForm } from 'react-hook-form'
import { useSignInMutation } from '@redux/api/supabaseApi'
import { validationSchema } from '../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<SignInPayload>({
    resolver: zodResolver(validationSchema.omit({ name: true }))
  })
  const [signIn, { isLoading }] = useSignInMutation()

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
