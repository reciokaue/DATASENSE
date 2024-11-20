import { api } from '../lib/api'
import { Question } from '../models'

interface GetSessionsProps {
  formId: number | string
}

interface GetSessionsData {
  questions: Question[]
}

export async function getSessions({
  formId,
}: GetSessionsProps): Promise<GetSessionsData> {
  const response = await api.get(`/responses/form/${formId}`)
  return response.data as GetSessionsData
}
