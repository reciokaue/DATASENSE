import { api } from '../lib/api'
import { Form } from '../models'

export async function createNewForm(
  form: Partial<Form>,
  templateId: number | null,
) {
  const response = await api.post<Form>('/form', form, {
    params: {
      templateId, // Envia o templateId como um parâmetro de consulta
    },
  })
  return response.data
}
