import * as z from 'zod'

const validationSchema = z.object({
  oldPassword: z.string().min(1, { message: 'jangan kosong euy' }),
  newPassword: z.string().min(6, { message: 'jangan kosong euy' })
})

export default validationSchema
