import { QuestionTypeDTO } from '../DTOs/questionType'
import { api } from '../lib/api'

export async function getQuestionTypes() {
  const response = await api.get(`/question-types`)
  return response.data as QuestionTypeDTO[]
}
