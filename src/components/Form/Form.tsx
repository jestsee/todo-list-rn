import { Control, Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { FieldError } from 'react-hook-form'
import { styles } from './styles'
import { useCapitalize } from '@hooks/useCapitalize'

export interface Props {
  control: Control
  name: string
  placeholder?: string
  error?: FieldError
  label?: string
  suffix?: React.ReactNode
  secureTextEntry?: boolean
}

export const Form: React.FC<Props> = ({
  placeholder,
  error,
  label,
  suffix,
  secureTextEntry,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label ?? useCapitalize(rest.name)}</Text>
      <Controller
        {...rest}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
            {suffix}
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  )
}
