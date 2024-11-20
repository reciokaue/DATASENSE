import { api } from '../lib/api'
import { Response } from '../models'

interface GetSessionsProps {
  formId: number | string
}

interface GetSessionsData {
  sessions: {
    id: string
    createdAt: string
    formId: string
    responses: Response[]
  }[]
}

export async function getSessions({
  formId,
}: GetSessionsProps): Promise<GetSessionsData> {
  const response = await api.get(`/responses/form/${formId}`)
  return response.data as GetSessionsData
}
