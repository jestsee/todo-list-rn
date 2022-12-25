import { Control, Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { FieldError } from 'react-hook-form'
import { styles } from './styles'
import { useCapitalize } from '@hooks/useCapitalize'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useToggle } from '@hooks/useToggle'

interface Props {
  control: Control
  name: string
  placeholder?: string
  error?: FieldError
  label?: string
  password?: boolean
}

export const Form: React.FC<Props> = ({
  placeholder,
  error,
  label,
  password,
  ...rest
}) => {
  const { show, toggleClick } = useToggle()

  return (
    <View style={styles.container}>
      <Text>{label ?? useCapitalize(rest.name)}</Text>
      <Controller
        {...rest}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.form}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={!show}
            />
            {password && (
              <Ionicon
                name={!show ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="darkgrey"
                onPress={toggleClick}
              />
            )}
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  )
}
