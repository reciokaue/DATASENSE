import { api } from '../lib/api'
import { User } from '../models'

export async function updateUser(user: Partial<User>) {
  const response = await api.put<User>(`/user/${user.id}`, user)
  return response.data
}
