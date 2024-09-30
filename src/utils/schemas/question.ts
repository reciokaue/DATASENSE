import { z } from 'zod'

import { optionSchema } from './option'
import { questionTypeSchema } from './questionType'

export const questionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  index: z.number().optional().default(0),
  questionType: questionTypeSchema.optional(),
  required: z.boolean().default(false),
  formId: z.coerce.number().positive().int().optional(),
  options: z.array(optionSchema).optional(),
})

export const questionSchemaArray = z.object({
  questions: z.array(questionSchema),
})

export type questionSchemaType = z.input<typeof questionSchema>
export type questionSchemaArrayType = z.input<typeof questionSchemaArray>
