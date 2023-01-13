/* eslint-disable indent */
import { FieldPath, FieldValues } from 'react-hook-form'
import { Form, Props as FormProps } from './Form'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useToggle } from '@hooks/useToggle'

interface Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<FormProps<TFieldValues, TName>, 'suffix' | 'secureTextEntry'> {
  touched?: boolean
}

export const PasswordForm = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  touched,
  ...formProps
}: Props<TFieldValues, TName>) => {
  const { show, toggleClick } = useToggle()
  return (
    <Form
      {...formProps}
      secureTextEntry={!show}
      suffix={
        touched && (
          <Ionicon
            name={!show ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color="darkgrey"
            onPress={toggleClick}
          />
        )
      }
    />
  )
}
