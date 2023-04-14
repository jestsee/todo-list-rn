/* eslint-disable sort-keys */
/* eslint-disable indent */
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController
} from 'react-hook-form'
import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native'
import { FieldError } from 'react-hook-form'
import { capitalize } from 'src/utils'
import { styles } from './styles'

type FormProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName>

export type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  style?: StyleProp<ViewStyle>
  placeholder?: string
  error?: FieldError
  label?: string
  suffix?: React.ReactNode
  secureTextEntry?: boolean
} & FormProps<TFieldValues, TName>

export const Form = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: Props<TFieldValues, TName>
) => {
  const {
    placeholder,
    error,
    label,
    suffix,
    secureTextEntry,
    name,
    control,
    style
  } = props
  const {
    field: { onBlur, onChange, value }
  } = useController({ name, control })

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label ?? capitalize(name)}</Text>
      <View style={[styles.form, style]}>
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
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  )
}
