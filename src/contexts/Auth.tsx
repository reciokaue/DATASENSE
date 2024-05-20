/* eslint-disable react-hooks/exhaustive-deps */
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
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
    const decoded: any = await jwtDecode(response.data)

    setCookie('datasense-token', response.data)
    api.defaults.headers.common.Authorization = `Bearer ${response.data}`

    if (remember) {
      localStorage.setItem('datasense_email', email)
    }
    if (decoded.access > 0) router.push('/admin/forms')
    else router.push('/dashboard')
  }

  async function logout() {
    deleteCookie('datasense-token')
    setUser({} as UserDTO)
    router.push('/login')
  }

  useEffect(() => {
    async function loadData() {
      try {
        const token = getCookie('datasense-token')
        const decoded: any = await jwtDecode(token as string)

        setUser({
          ...decoded,
          id: decoded.sub,
          accessLevel: decoded.access,
        } as UserDTO)

        // if (decoded.access > 0) router.push('/admin/forms')
        // else router.push('/dashboard')

        api.defaults.headers.common.Authorization = `Bearer ${token}`
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
