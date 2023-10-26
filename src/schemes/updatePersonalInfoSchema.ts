import { z } from 'zod'

export const updatePersonalInfoSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  avatar: z.instanceof(File).optional(),
  name: z.string().min(3, { message: 'Nickname must contain at least three characters' }),
})
