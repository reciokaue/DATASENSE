import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function getForm(id: number | string) {
  try {
    const response = await api.get(`/form/${String(id)}`)
    console.log(response.data)
    return response.data as FormDTO
  } catch (error) {
    console.log(error)
  }
}
