import { z } from 'zod'

import { questionSchema } from './question'
import { topicSchema } from './topic'

export const formSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  name: z.string(),
  description: z.string().nullable().optional().default(''),
  active: z.boolean().nullable().optional().default(false),
  isPublic: z.boolean().optional().default(false),
  createdAt: z.string().nullable().optional(),
  userId: z.coerce.number().positive().int().optional(),
  topics: z.array(topicSchema).optional(),
  logoUrl: z.string().nullable().optional(),
  questions: z.array(questionSchema).optional(),
})

export const createFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  description: z.string().nullable().optional(),
  topics: z
    .array(topicSchema)
    .min(1, { message: 'Selecione pelo menos um tópico' }),
})

export const formSchemaCreate = formSchema.extend({
  topics: z.array(z.number()).optional(),
  questions: z
    .array(questionSchema)
    .transform((questions) => ({ create: questions }))
    .optional(),
})

export const formSchemaUpdate = formSchema.extend({
  topics: z.array(z.number()).optional(),
  questions: z
    .array(questionSchema)
    .transform((questions) => ({ updateMany: questions }))
    .optional(),
})

export type formSchemaType = z.input<typeof formSchema>
