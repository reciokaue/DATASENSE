'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { QuestionCardClosed } from '@/components/question-card/closed'
import { SortableItem } from '@/components/sortable/sortable-item'
import { SortableList } from '@/components/sortable/sortable-list'
import { api } from '@/lib/api'
import { QuestionSchema } from '@/utils/schemas/form'

import { FormLayoutProps } from '../layout'

interface QuestionProps extends QuestionSchema {
  id: string
}

export default function FormQuestions({ params }: FormLayoutProps) {
  const [items, setItems] = useState<QuestionProps[]>()

  useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const response = await api.get(`/forms/${params.formId}`)
      setItems(response.data.questions)
    },
  })

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      {items && (
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item: QuestionProps, index: number) => (
            <SortableItem id={item.id}>
              <QuestionCardClosed key={item.id} question={item} index={index} />
            </SortableItem>
          )}
        />
      )}
    </div>
  )
}
