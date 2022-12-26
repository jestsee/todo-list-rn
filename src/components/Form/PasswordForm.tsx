import { Form, Props as FormProps } from './Form'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useToggle } from '@hooks/useToggle'

interface Props extends Omit<FormProps, 'suffix' | 'secureTextEntry'> {
  touched?: boolean
}

export const PasswordForm: React.FC<Props> = ({ touched, ...formProps }) => {
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
