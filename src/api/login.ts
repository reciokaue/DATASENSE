import { setCookie } from 'cookies-next'

import { User } from '@/models'

import { api } from '../lib/api'

interface LoginProps {
  email: string
  password: string
  remember?: boolean
}

interface AuthData {
  user: User
  token: string
}

export async function login({ email, password, remember }: LoginProps) {
  const response = await api.post('/login', { email, password })

  setCookie('datasense-token', response.data.token)
  api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`

  if (remember) {
    localStorage.setItem('datasense_email', email)
  }

  return response.data as AuthData
}
