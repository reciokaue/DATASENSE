import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function getForm(id: number) {
  const response = await api.get(`/form/${id}`)
  return response.data as FormDTO
}
