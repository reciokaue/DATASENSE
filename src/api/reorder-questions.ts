import { api } from '../lib/api'

interface ReorderQuestionsProps {
  formId: string
  newOrder: number[]
}

export async function reorderQuestions({
  formId,
  newOrder,
}: ReorderQuestionsProps) {
  try {
    const response = await api.post(`/form/${formId}/question-order`, {
      newOrder,
    })
    return response.data
  } catch (error) {
    console.error('Erro ao reordenar questões:', error)
    throw error
  }
}
