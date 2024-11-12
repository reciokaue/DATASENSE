import { api } from '@/lib/api'

interface FormSummary {
  totalSessions: number
  totalResponses: number
  totalQuestions: number
  averageResponsesPerSession: number
  completionRate: number
}

export async function getFormSummary(
  formId: string | number,
): Promise<FormSummary> {
  const response = await api.get(`/analytics/forms/${formId}/summary`)
  return response.data
}
