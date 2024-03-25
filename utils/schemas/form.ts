import { z } from 'zod'

export const OptionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  value: z.number(),
  emoji: z.string().optional(),
})

export const QuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  isDefault: z.boolean().optional(),
  type: z.string(),
  topics: z.array(z.string()),
  options: z
    .array(OptionSchema)
    .optional()
    .transform((options) => {
      return {
        create: options,
      }
    }),
})

export const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  about: z.string().nullable().optional(),
  active: z.boolean().nullable().optional().default(false),
  isDefault: z.boolean().optional().default(false),
  createdAt: z.string().nullable().optional(),
  endedAt: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  topics: z.array(z.string()),
  logoUrl: z.string().nullable().optional(),
  questions: z
    .array(QuestionSchema)
    .optional()
    .transform((questions) => {
      return {
        create: questions,
      }
    }),
})

export type QuestionInput = z.input<typeof QuestionSchema>
export type QuestionOutput = z.output<typeof QuestionSchema>
