import { z } from 'zod'

import { createNewPasswordSchema, emailSchema, newDeckNameSchema } from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof emailSchema>

export type CreateNewPasswordFields = z.infer<typeof createNewPasswordSchema>

export type NewDeckNameField = z.infer<typeof newDeckNameSchema>

export type RadioGroupOptions = {
  label: string
  value: string
}

export enum DeckModals {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
