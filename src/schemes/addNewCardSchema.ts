import { z } from 'zod'

export const addNewCardSchema = z.object({
  question: z.string().min(1, { message: 'Question must contain at least one character' }),
  answer: z.string().min(1, { message: 'Answer must contain at least one character' }),
  answerImg: z.string().optional(),
  questionImg: z.string().optional(),
  questionVideo: z.string().optional(),
  answerVideo: z.string().optional(),
})
