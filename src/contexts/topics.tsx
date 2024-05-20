'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'

import { api } from '@/src/lib/api'

import { TopicDTO } from '../DTOs/topic'

interface topicsProviderProps {
  children: ReactNode
}

interface TopicsContextData {
  topics: Array<TopicDTO>
  removeTopics: (removedTopics: Array<TopicDTO>) => Promise<void>
  addNewTopics: (newTopics: Array<TopicDTO>) => Promise<void>
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

  async function addNewTopics(newTopics: Array<TopicDTO>) {
    try {
      if (newTopics.length === 0) return
      const topicNames = newTopics.map((topic) => topic.name)
      const response = await api.post('/topics', topicNames)

      const newData = [...topics, ...response.data]
      queryClient.setQueryData(['topics'], newData)
    } catch (e) {
      console.log(e)
    }
  }
  async function removeTopics(removedTopics: Array<TopicDTO>) {
    try {
      if (removedTopics.length === 0) return
      const topicIds = removedTopics.map((topic) => topic.id)
      await api.delete('/topics', {
        data: [8, 9, 10],
      })

      queryClient.setQueryData(['topics'], (data: Array<TopicDTO>) =>
        data.filter((topic) => !topicIds.includes(topic.id)),
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TopicsContext.Provider value={{ topics, addNewTopics, removeTopics }}>
      {children}
    </TopicsContext.Provider>
  )
}

export const useTopics = () => useContext(TopicsContext)
