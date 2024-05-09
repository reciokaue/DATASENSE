'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'

import { api } from '@/src/lib/api'

interface topicsProviderProps {
  children: ReactNode
}

interface TopicsContextData {
  topics: Array<string>
  removeTopics: (removedTopics: Array<string>) => Promise<void>
  addNewTopics: (newTopics: Array<string>) => Promise<void>
}

const TopicsContext = createContext({} as TopicsContextData)

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

  const addNewTopics = async (newTopics: Array<string>) => {
    if (newTopics.length === 0) return
    await api.post('/topics', {
      topics: newTopics,
    })

    const newData = [...topics, ...newTopics]
    queryClient.setQueryData(['topics'], newData)
  }
  async function removeTopics(removedTopics: Array<string>) {
    if (removedTopics.length === 0) return

    await api.delete('/topics', {
      data: { topics: removedTopics },
    })

    queryClient.setQueryData(['topics'], (data: Array<string>) =>
      data.filter((topic) => !removedTopics.includes(topic)),
    )
  }

  return (
    <TopicsContext.Provider value={{ topics, addNewTopics, removeTopics }}>
      {children}
    </TopicsContext.Provider>
  )
}

export const useTopics = () => useContext(TopicsContext)
