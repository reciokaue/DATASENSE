import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function updateForm(form: Partial<FormDTO>) {
  const response = await api.put(`/form/${form.id}`, form)
  return response
}
