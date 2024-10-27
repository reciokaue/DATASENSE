import { api } from '../lib/api'
import { Question } from '../models'

interface GetQuestionsProps {
  query?: string
  page?: number
  pageSize?: number
  categoryId?: number
}

interface GetQuestionsData {
  questions: Question[]
}

export async function getQuestions({
  query,
  page = 0,
  pageSize = 10,
  categoryId,
}: GetQuestionsProps): Promise<GetQuestionsData> {
  const response = await api.get(`/questions`, {
    params: { query, page, pageSize, categoryId },
  })
  return response.data as GetQuestionsData
}
