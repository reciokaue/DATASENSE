import { User } from '@/models'

import { api } from '../lib/api'

interface GetUserProps {
  userId: string
}

export async function getUser({ userId }: GetUserProps) {
  const response = await api.post(`/user/${userId}`)

  return response.data as User
}
