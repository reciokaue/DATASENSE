import { api } from '../lib/api'
import { AuthData } from './login'

interface LoginProps {
  email: string
  password: string
  name: string
}

export async function registerUser({ email, password, name }: LoginProps) {
  const response = await api.post('/register', {
    email,
    password,
    name,
  })

  return response.data as AuthData
}
