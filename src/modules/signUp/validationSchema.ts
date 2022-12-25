import * as z from 'zod'

export const validationSchema = z.object({
  email: z.string().email('Format email yang bener'),
  name: z.string().min(1, { message: 'jangan kosong euy' }),
  password: z.string().min(6, 'Password minimal 6 karakter')
})
