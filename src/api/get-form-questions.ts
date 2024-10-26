import { QuestionDTO } from '../DTOs/question'
import { api } from '../lib/api'

export async function getFormQuestions(id: number | string) {
  try {
    const response = await api.get(`/questions/form/${String(id)}`)
    return response.data as QuestionDTO[]
  } catch (error) {
    console.log(error)
  }
}
