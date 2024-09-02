import { api } from '../lib/api'

interface CopyFormProps {
  formId: number
  modelId: number
}

export async function copyForm({ formId, modelId }: CopyFormProps) {
  await api.post(`/form/${formId}/model/${modelId}`)
}
