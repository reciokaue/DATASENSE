import { api } from '../lib/api'
import { Question } from '../models'

export async function getQuestion(
  questionId: number,
): Promise<Question | null> {
  const response = await api.get(`/question/${questionId}`)
  return response.data as Question
}
