import { z } from 'zod'

import { forgotPasswordSchema } from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>
