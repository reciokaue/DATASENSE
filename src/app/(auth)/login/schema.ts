import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Deve ser um email valido'),
  password: z.string().min(6, 'Deve ter no mínimo 6 caracteres').trim(),
  rememberMe: z.boolean().nullable(),
})
export type loginSchemaProps = z.infer<typeof loginSchema>
