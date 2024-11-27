import { api } from '../lib/api'
import { Form } from '../models'

export async function updateForm(form: Partial<Form>) {
  const response = await api.put<Form>(`/form/${form.id}`, form)
  return response.data
}
