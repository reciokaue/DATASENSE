import { api } from '../lib/api'
import { Question } from '../models'

interface GetQuestionsProps {
  query?: string
  page?: number
  pageSize?: number
  categoryId?: number
  questionTypeId?: number
}

export interface GetQuestionsData {
  meta: {
    page: number
    pageSize: number
    totalCount: number
  }
  questions: Question[]
}

export async function getQuestions({
  query,
  page = 0,
  pageSize = 10,
  categoryId,
  questionTypeId,
}: GetQuestionsProps): Promise<GetQuestionsData> {
  const response = await api.get(`/questions`, {
    params: { query, page, pageSize, categoryId, questionTypeId },
  })
  return response.data as GetQuestionsData
}
