import { Session, User } from '@supabase/supabase-js'

export type SignUpPayload = {
  name: string
  email: string
  password: string
}

export type SignInPayload = Omit<SignUpPayload, 'name'>

export type SignInResponse = {
  user: User | null
  session: Session | null
}

export type AuthError = { message: string }
