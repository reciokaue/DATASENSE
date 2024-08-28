import { api } from '../lib/api'

interface QuestionOrder {
  from: number
  to: number
  questionId: number
}

export async function updateQuestion({ from, to, questionId }: QuestionOrder) {
  const response = await api.put(`/question/${questionId}/question-order`, {
    from,
    to,
  })
  return response
}
