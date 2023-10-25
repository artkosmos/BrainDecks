import { z } from 'zod'
import { updatePersonalInfoSchema } from '@/schemes/updatePersonalInfoSchema.ts'

export type UpdatePersonalInfo = z.infer<typeof updatePersonalInfoSchema>
