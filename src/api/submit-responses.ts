import { api } from '../lib/api'
import { Response } from '../models'

export async function submitResponses(formId: number, responses: Response[]) {
  await api.post(`/responses/form/${formId}`, responses)
}
