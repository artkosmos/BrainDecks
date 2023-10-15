import { z } from 'zod'

export const newDeckNameSchema = z.object({
  name: z.string().min(1),
  isPrivate: z.boolean().optional(),
  cover: z.any().optional(),
})
