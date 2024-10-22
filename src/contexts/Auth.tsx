/* eslint-disable react-hooks/exhaustive-deps */
import { useQueryClient } from '@tanstack/react-query'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useToast } from '../components/ui/use-toast'
import { UserDTO } from '../DTOs/user'
import { api } from '../lib/api'
import { AppError } from '../utils/AppError'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: UserDTO
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  createAccount: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const { toast } = useToast()

  async function login(email: string, password: string, remember?: boolean) {
    try {
      const response = await api.post('/login', { email, password })

      setCookie('datasense-token', response.data)
      api.defaults.headers.common.Authorization = `Bearer ${response.data}`

      if (remember) {
        localStorage.setItem('datasense_email', email)
      }
      router.push('/forms')
    } catch (e: any) {
      const isAppError = e instanceof AppError
      console.log(e)

      toast({
        title: isAppError ? e.message : 'Não foi possível fazer login',
        description: e.description,
        variant: 'destructive',
      })
    }
  }

  async function createAccount(email: string, password: string, name: string) {
    try {
      const response = await api.post('/register', {
        email,
        password,
        name,
      })
      setCookie('datasense-token', response.data)
      api.defaults.headers.common.Authorization = `Bearer ${response.data}`

      router.push('/forms')
    } catch (e: any) {
      const isAppError = e instanceof AppError
      console.log(e)

      toast({
        title: isAppError ? e.message : 'Não foi possível criar conta',
        description: e.description,
        variant: 'destructive',
      })
    }
  }

  async function logout() {
    deleteCookie('datasense-token')
    setUser({} as UserDTO)

    await queryClient.cancelQueries()
    queryClient.clear()

    router.replace('/login')
  }

  useEffect(() => {
    async function loadData() {
      try {
        const token = getCookie('datasense-token')
        const decoded: any = await jwtDecode(token as string)

        setUser({
          ...decoded,
          id: decoded.sub,
        } as UserDTO)

        api.defaults.headers.common.Authorization = `Bearer ${token}`

        if (pathname === '/login' || pathname === '/') router.push('/forms')
      } catch (e) {
        router.push('/login')
      }
    }
    loadData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        createAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
