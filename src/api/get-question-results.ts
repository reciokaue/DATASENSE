import { api } from '@/lib/api'

export interface OptionResult {
  label: string
  value: number
  percentage: number
}

export interface QuestionResult {
  id: number
  text: string
  type: string
  index: number
  required: boolean
  isMultipleChoice: boolean
  hasNumericValues: boolean
  totalResponses: number
  chartData?: Array<{ label: string; value: number; percentage: number }>
  statistics?: {
    average: number
    min: number
    max: number
    median: number
  }
  responses?: Array<{ text: string; count: number }>
}

export interface QuestionsResults {
  formId: number
  totalQuestions: number
  questions: QuestionResult[]
}

interface GetQuestionsResultsProps {
  formId: number | string
  from?: Date
  to?: Date
  query?: string
}

export async function getQuestionsResults({
  formId,
  from,
  to,
  query,
}: GetQuestionsResultsProps): Promise<QuestionsResults> {
  const response = await api.get(
    `/analytics/forms/${formId}/questions-results`,
    {
      params: {
        to,
        from,
        query,
      },
    },
  )
  return response.data
}
