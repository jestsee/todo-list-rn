import * as z from 'zod'

const validationSchema = z.object({
  newName: z.string().min(1, { message: 'jangan kosong euy' })
})

export default validationSchema
