import { api } from '../lib/api'
import { Form } from '../models'

export async function getForm(id: number | string) {
  const response = await api.get(`/form/${String(id)}`)
  return response.data as Form
}
