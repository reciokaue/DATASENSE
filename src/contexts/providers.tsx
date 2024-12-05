'use client'

import 'react-toastify/dist/ReactToastify.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { useAuth } from './useAuth'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1hr,
      refetchInterval: 1000 * 60 * 60, // 1hr
      gcTime: 1000 * 60 * 60, // 1hr,,
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  const { hydrate, status } = useAuth()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  if (status === 'idle') return null

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  )
}
