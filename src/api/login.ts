import { User } from '@/models'

import { api } from '../lib/api'

interface LoginProps {
  email: string
  password: string
  remember?: boolean
}

export interface AuthData {
  user: User
  token: string
}

export async function login({ email, password }: LoginProps) {
  const response = await api.post('/login', { email, password })

  return response.data as AuthData
}
