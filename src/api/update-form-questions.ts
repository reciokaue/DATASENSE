import { QuestionDTO } from '../DTOs/question'
import { api } from '../lib/api'

export async function updateFormQuestions(
  formId: string | number,
  questions: QuestionDTO[],
) {
  const response = await api.put(`/form/${formId}/questions`, questions)
  return response
}
