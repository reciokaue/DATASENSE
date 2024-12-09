import { api } from '../lib/api'

interface Result {
  logoUrl: string
}

export async function uploadFormImage(
  formId: number,
  file?: File,
): Promise<Result> {
  const formData = new FormData()
  formData.append('file', file)

  const result = await api.patch(`/form/${formId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return result.data as Result
}
