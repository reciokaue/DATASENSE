import { api } from '../lib/api'
import { Question } from '../models'

export async function addQuestionToForm(
  questionId: number,
  formId: number,
): Promise<Question> {
  const response = await api.post(`/question/${questionId}/form/${formId}`)
  return response.data as Question
}
