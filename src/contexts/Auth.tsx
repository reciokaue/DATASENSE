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
import { api } from '../lib/api'
import { User } from '../models'
import { AppError } from '../utils/AppError'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User
  login: (email: string, password: string, remember: boolean) => Promise<void>
  createAccount: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

const protectedRoutes = ['form', 'home']

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  const router = useRouter()
  const pathname = usePathname().split('/')[1]
  const queryClient = useQueryClient()

  const { toast } = useToast()

  async function login(email: string, password: string, remember: boolean) {
    try {
      const { data: token } = await api.post('/login', { email, password })

      setCookie('datasense-token', token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      const decoded: any = await jwtDecode(token as string)

      setUser({
        ...decoded,
        id: decoded.sub,
      } as User)

      if (remember) {
        localStorage.setItem('datasense_email', email)
      }
      router.push('/home')
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

      router.push('/home')
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
    setUser({} as User)

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
        } as User)

        api.defaults.headers.common.Authorization = `Bearer ${token}`
      } catch (e) {
        console.log(pathname)
        if (protectedRoutes.includes(pathname)) router.push('/login')
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
