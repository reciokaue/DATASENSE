import { api } from '@/lib/api'

interface DeleteProfileProps {
  userId: string | number
}

export async function DeleteProfile({ userId }: DeleteProfileProps) {
  await api.delete(`/user/${userId}`)
}
