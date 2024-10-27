import { api } from '../lib/api'
import { QuestionType } from '../models'

export async function getQuestionTypes() {
  const response = await api.get(`/question-types`)
  return response.data as QuestionType[]
}
