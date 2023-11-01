import { z } from 'zod'

export const saveGradeSchema = z.object({
  grade: z.string({ required_error: 'You should rate the question to go to the next one' }),
})
