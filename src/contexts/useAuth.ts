import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { create } from 'zustand'

import { AuthData } from '@/api/login'
import { api } from '@/lib/api'
import { User } from '@/models'

interface loginProps {
  auth: AuthData
  rememberMe?: boolean
}

type AuthStore = {
  user: User | null
  status: 'idle' | 'signOut' | 'signIn'
  setUser: (data: loginProps) => void
  logout: () => void
  hydrate: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  status: 'idle',
  user: null,
  setUser: ({ auth, rememberMe }: loginProps) => {
    const { user, token } = auth
    set({ user, status: 'signIn' })
    setCookie('datasense-token', token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    if (rememberMe) localStorage.setItem('datasense@user', JSON.stringify(user))
  },
  logout: () => {
    set({ user: null, status: 'signOut' })
    deleteCookie('datasense-token')
    api.defaults.headers.common.Authorization = ``

    localStorage.removeItem('datasense@user')
  },
  hydrate: () => {
    const storage = localStorage.getItem('datasense@user')
    const userStorage = storage && JSON.parse(storage)
    const token = getCookie('datasense-token') || ''

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    if (userStorage) set({ user: userStorage, status: 'signIn' })
    else set({ status: 'signOut' })
  },
}))
