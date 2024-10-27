import { api } from '../lib/api'

export async function copyQuestionsToForm(
  formId: number,
  toFormId: number,
): Promise<void> {
  await api.post(`/questions/from/${formId}/to/${toFormId}`)
}
