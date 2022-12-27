import { Form, PasswordForm } from '@components'
import { Button } from 'react-native'
import { SignUpPayload as Payload } from '@custom-types/auth'
import { useForm } from 'react-hook-form'
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
  const onSubmit = (data: Payload) => console.log(data)

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
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </>
  )
}
