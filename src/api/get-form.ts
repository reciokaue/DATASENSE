import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function getForms(id: string) {
  const response = await api.get(`/form/${id}`)
  return response.data as FormDTO
}
