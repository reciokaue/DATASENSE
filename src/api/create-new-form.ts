import { FormDTO } from '../DTOs/form'
import { api } from '../lib/api'

export async function createNewForm(newForm: Partial<FormDTO>) {
  const topics = newForm?.topics?.map((topic) => topic.id)
  const form = {
    ...newForm,
    topics,
    active: true,
    isPublic: false,
  }
  console.log(form)

  const response = await api.post(`/form`, form)
  return response.data as FormDTO
}
