import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function getForms(query?: string) {
  const response = await api.get(`/forms`, {
    ...(query && {
      params: { query },
    }),
  })
  return response.data as FormDTO[]
}
