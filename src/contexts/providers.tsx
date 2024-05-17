'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { Toaster } from '@/src/components/ui/toaster'

import { AuthProvider } from './Auth'
import { SelectedFormProvider } from './selected-form'
import { TopicsProvider } from './topics'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1hr,
      refetchInterval: 1000 * 60 * 3, // 3min
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TopicsProvider>
        <AuthProvider>
          <SelectedFormProvider>{children}</SelectedFormProvider>
        </AuthProvider>
      </TopicsProvider>
      <Toaster />
    </QueryClientProvider>
  )
}
