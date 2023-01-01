export type SnackbarProps = {
  show: boolean
  variant?: Variant
  message: string
  dismissable?: boolean
}

export type SnackbarPayload = SnackbarProps & {
  duration?: Duration
}

export type ShowSnackbarPayload = Omit<SnackbarPayload, 'show'>

export enum Variant {
  ERROR = 'error',
  SUCCESS = 'success',
  WARN = 'warn',
  INFO = 'info'
}

export enum Duration {
  SHORT = 3,
  LONG = 5
}
