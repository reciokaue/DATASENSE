'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/toaster'

import { SelectedFormProvider } from './selected-form'
import { TopicsProvider } from './topics'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TopicsProvider>
        <SelectedFormProvider>{children}</SelectedFormProvider>
      </TopicsProvider>
      <Toaster />
    </QueryClientProvider>
  )
}
