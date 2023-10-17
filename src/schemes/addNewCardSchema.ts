import { z } from 'zod'

export const addNewCardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  selectCardFormat: z.string(),
  answerImg: z.string().optional(),
  questionImg: z.string().optional(),
  questionVideo: z.string().optional(),
  answerVideo: z.string().optional(),
})
