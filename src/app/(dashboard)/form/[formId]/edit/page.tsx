'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CopyPlus, LoaderIcon } from 'lucide-react'
import { useState } from 'react'

import { QuestionCard } from '@/src/components/question'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { useToast } from '@/src/components/ui/use-toast'
import { FormDTO } from '@/src/DTOs/form'
import { QuestionDTO } from '@/src/DTOs/question'
import { api } from '@/src/lib/api'
import { findMovedPosition } from '@/src/utils/findMovedPosition'

import { PageFormSlugProps } from '../layout'

export default function FormQuestions({ params }: PageFormSlugProps) {
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  const [editingQuestionId, setEditingQuestionId] = useState(0)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const response = await api.get(`/form/${params.formId}`)
      setQuestions(response.data.questions)
      return response.data as FormDTO
    },
  })

  async function onChangeOrder(data: any) {
    const indexSortedQuestions = data.map((question: any, index: number) => ({
      ...question,
      index,
    }))
    queryClient.setQueryData(['form', params.formId], {
      ...form,
      questions: indexSortedQuestions,
    })
    setQuestions(indexSortedQuestions)

    const movedIndex = findMovedPosition(
      questions.map((q: any) => q.index),
      data.map((q: any) => q.index),
    )
    try {
      await api.post(`/form/${params.formId}/question-order`, movedIndex)
    } catch (e) {
      console.log(e)
      toast({
        title: 'Não foi possível salvar o ordem das questões',
        variant: 'destructive',
      })
    }
  }

  if (!form)
    return (
      <div className="flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    )

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center ">
      <header className="flex h-56 w-full cursor-pointer items-center justify-center rounded-lg bg-secondary text-neutral-800">
        <CopyPlus size={32} />
      </header>
      <h1 className="w-full py-4 text-2xl font-bold text-primary/80">
        {form.name}
      </h1>
      <SortableList
        items={questions}
        onChange={onChangeOrder}
        renderItem={(item) => (
          <SortableItem
            sortableId={item.id}
            className="flex items-center gap-2"
            isEditing={editingQuestionId === 0}
          >
            <QuestionCard
              key={`question-${item.id}`}
              question={item}
              editing={{ id: editingQuestionId, set: setEditingQuestionId }}
            />
          </SortableItem>
        )}
      />
    </div>
  )
}
