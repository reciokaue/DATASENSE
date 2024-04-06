'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'

import { api } from '@/lib/api'

interface topicsProviderProps {
  children: ReactNode
}

interface topicsContextData {
  topics: string[]
  removeTopics: (removedTopics: string[]) => Promise<void>
  addNewTopics: (newTopics: string[]) => Promise<void>
}

const topicsContext = createContext({} as topicsContextData)

export function TopicsProvider({ children }: topicsProviderProps) {
  const queryClient = useQueryClient()

  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await api.get(`/topics`, {
        params: { pageSize: 100 },
      })

      return response.data
    },
  })

  const addNewTopics = async (newTopics: string[]) => {
    if (newTopics.length === 0) return

    await api.post('/topics', {
      topics: newTopics,
    })

    queryClient.setQueryData(['topics'], (data: string[]) => [
      ...data,
      ...newTopics,
    ])
  }
  const removeTopics = async (removedTopics: string[]) => {
    if (removedTopics.length === 0) return

    await api.delete('/topics', {
      data: { topics: removedTopics },
    })

    queryClient.setQueryData(['topics'], (data: string[]) =>
      data.filter((topic) => !removedTopics.includes(topic)),
    )
  }

  return (
    <topicsContext.Provider value={{ topics, addNewTopics, removeTopics }}>
      {children}
    </topicsContext.Provider>
  )
}

export const useTopics = () => useContext(topicsContext)
