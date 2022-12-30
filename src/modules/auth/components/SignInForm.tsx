import { Button, Form, PasswordForm } from '@components'
import { SignInPayload } from '@custom-types/auth'
import { useForm } from 'react-hook-form'
import { useSignInMutation } from '@redux/api/supabaseApi'
import { useSnackbar } from '@hooks/useSnackbar'
import { validationSchema } from '../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Duration } from '@custom-types/snackbar'

export const SignInForm = () => {
  const [signIn, { isLoading, isSuccess, isError, error }] = useSignInMutation()
  const { showSnackbar, errorSnackbar } = useSnackbar()
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<SignInPayload>({
    resolver: zodResolver(validationSchema.omit({ name: true }))
  })

  useEffect(() => {
    if (isError)
      errorSnackbar({
        duration: Duration.LONG,
        message: error?.message as string
      })
    if (isSuccess) showSnackbar({ message: 'Successfully signed in' })
  }, [isError, isSuccess, errorSnackbar, showSnackbar])

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
