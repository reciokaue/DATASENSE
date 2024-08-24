import { z } from 'zod'

import { optionSchema } from './option'
import { questionTypeSchema } from './questionType'

export const questionSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  text: z.string(),
  index: z.number().optional().default(0),
  formId: z.coerce.number().positive().int().optional(),
  questionType: questionTypeSchema.optional(),
  options: z.array(optionSchema).optional(),
  deletedOptions: z.array(optionSchema).optional(),
  required: z.boolean().default(false),
})

export type questionSchemaType = z.input<typeof questionSchema>
