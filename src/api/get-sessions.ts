import { api } from '../lib/api'
import { Response } from '../models'

interface GetSessionsProps {
  formId: number | string
  from?: Date
  to?: Date
  query?: string
  page?: number
  pageSize?: number
}

interface GetSessionsData {
  sessions: {
    id: string
    createdAt: string
    formId: string
    responses: Response[]
  }[]
  meta: {
    page: number
    pageSize: number
    totalCount: number
  }
}

export async function getSessions({
  formId,
  from,
  to,
  query,
  page,
  pageSize,
}: GetSessionsProps): Promise<GetSessionsData> {
  const response = await api.get(`/responses/form/${formId}`, {
    params: {
      to,
      from,
      query,
      page,
      pageSize,
    },
  })
  return response.data as GetSessionsData
}
