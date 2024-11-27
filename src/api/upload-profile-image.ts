import { api } from '../lib/api'

interface Result {
  profileImage: string
}

export async function uploadUserImage(
  userId: number | string,
  file: File,
): Promise<Result> {
  const formData = new FormData()
  formData.append('file', file)

  const result = await api.patch(`/user/${userId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return result.data as Result
}
