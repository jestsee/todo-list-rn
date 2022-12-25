import { Form, Props as FormProps } from './Form'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useToggle } from '@hooks/useToggle'

export const PasswordForm: React.FC<
  Omit<FormProps, 'suffix' | 'secureTextEntry'>
> = (formProps) => {
  const { show, toggleClick } = useToggle()
  return (
    <Form
      {...formProps}
      secureTextEntry={!show}
      suffix={
        <Ionicon
          name={!show ? 'eye-outline' : 'eye-off-outline'}
          size={24}
          color="darkgrey"
          onPress={toggleClick}
        />
      }
    />
  )
}
