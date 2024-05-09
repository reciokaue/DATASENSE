/* eslint-disable react-hooks/exhaustive-deps */
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { UserDTO } from '../DTOs/user'
import { api } from '../lib/api'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: UserDTO
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const router = useRouter()

  async function login(email: string, password: string, remember?: boolean) {
    const response = await api.post('/login', { email, password })

    setCookie('datasense-token', response.data)

    if (remember) {
      localStorage.setItem('datasense_email', email)
      localStorage.setItem('datasense_password', password)
    }

    router.push('/dashboard')
  }

  async function logout() {
    deleteCookie('datasense-token')
    setUser({} as UserDTO)
    router.push('/login')
  }

  useEffect(() => {
    async function loadData() {
      const token = getCookie('datasense-token')
      if (token) router.push('/dashboard')
    }
    loadData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
