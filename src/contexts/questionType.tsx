'use client'

import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'

import { QuestionTypeDTO } from '../DTOs/questionType'
import { api } from '../lib/api'

interface questionTypeProviderProps {
  children: ReactNode
}

interface questionTypeContextData {
  questionTypes?: QuestionTypeDTO[]
  questionTypesById?: {
    [key: string]: {
      id: number
      name: string
      label: string
      icon: string
    }
  }
}

const questionTypeContext = createContext({} as questionTypeContextData)

export function QuestionTypeProvider({ children }: questionTypeProviderProps) {
  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: async () => {
      const response = await api.get('/question-types')
      return response.data as QuestionTypeDTO[]
    },
  })

  const questionTypesById =
    questionTypes &&
    questionTypes.reduce((acc: any, item: QuestionTypeDTO) => {
      acc[item.id] = item
      return acc
    }, {})

  return (
    <questionTypeContext.Provider value={{ questionTypes, questionTypesById }}>
      {children}
    </questionTypeContext.Provider>
  )
}

export const useQuestionType = () => useContext(questionTypeContext)
