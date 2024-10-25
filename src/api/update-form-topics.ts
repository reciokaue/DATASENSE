import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function updateFormTopics(form: Partial<FormDTO>) {
  const response = await api.put(`/form/${form.id}/topics`, form)
  return response
}
