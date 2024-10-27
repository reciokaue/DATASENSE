import { api } from '../lib/api'
import { Form } from '../models'

export async function updateForm(form: Partial<Form>) {
  const response = await api.put(`/form/${form.id}`, form)
  return response
}
