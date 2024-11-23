import { api } from '../lib/api'
import { Question } from '../models'

export async function updateQuestions(
  formId: number | string,
  questions: Question[],
) {
  const response = await api.put(`/questions/form/${formId}`, questions)
  return response
}
