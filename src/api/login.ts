import { setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { api } from '../lib/api'

interface LoginProps {
  email: string
  password: string
  remember?: boolean
}

export async function login({ email, password, remember }: LoginProps) {
  const response = await api.post('/login', { email, password })
  const decoded: any = await jwtDecode(response.data)

  setCookie('datasense-token', response.data)
  api.defaults.headers.common.Authorization = `Bearer ${response.data}`

  if (remember) {
    localStorage.setItem('datasense_email', email)
  }

  return decoded
}
