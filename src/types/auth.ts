export type SignUpPayload = {
  name: string
  email: string
  password: string
}

export type SignInPayload = Omit<SignUpPayload, 'name'>
