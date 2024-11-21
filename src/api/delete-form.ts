import { api } from '../lib/api'

export async function deleteForm(formId: number | string): Promise<void> {
  await api.delete(`/form/${formId}`)
}
