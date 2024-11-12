import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(3, 'Deve ter no mínimo 3 caracteres'),
  email: z.string().email('Deve ser um email valido'),
  password: z.string().min(6, 'Deve ter no mínimo 6 caracteres').trim(),
})
export type Props = z.infer<typeof schema>
