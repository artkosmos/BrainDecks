import { z } from 'zod'

import { createNewPasswordSchema, emailSchema, newCardSchema, newDeckNameSchema } from '@/schemes'

export type ForgotPasswordFields = z.infer<typeof emailSchema>

export type CreateNewPasswordFields = z.infer<typeof createNewPasswordSchema>

export type NewDeckNameField = z.infer<typeof newDeckNameSchema>

export type NewCardField = z.infer<typeof newCardSchema>

export type RadioGroupOptions = {
  label: string
  value: string
}

export enum DeckModals {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
export enum CardsModals {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
