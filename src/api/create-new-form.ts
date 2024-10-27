import { api } from '../lib/api'
import { Form } from '../models'

export async function createNewForm(form: Partial<Form>) {
  const response = await api.post(`/form`, form)
  return response.data as Form
}
