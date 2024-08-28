import { QuestionDTO } from '../DTOs/question'
import { api } from '../lib/api'

export async function updateQuestion(question: QuestionDTO) {
  const response = await api.put(`/question/${question.id}`, question)
  return response
}
