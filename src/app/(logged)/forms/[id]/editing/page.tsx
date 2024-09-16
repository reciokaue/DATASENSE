'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'

import { getForm } from '@/src/api/get-form'
import { reorderQuestions } from '@/src/api/reorder-questions'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Skeleton } from '@/src/components/ui/skeleton'
import { FormDTO } from '@/src/DTOs/form'
import { QuestionDTO } from '@/src/DTOs/question'
import { debounce } from '@/src/utils/debounce'

import { Card } from './card'

export default function Page({ params }: { params: { id: string } }) {
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  // const [previousQuestions, setPreviousQuestions] = useState<QuestionDTO[]>([])

  const queryClient = useQueryClient()
  const formId = +params.id

  const { data: form } = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      setQuestions(data?.questions || [])
      return data
    },
  })

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (newOrder: number[]) => {
      await reorderQuestions({
        formId,
        newOrder,
      })
    },
    // onMutate: (newOrder) => {
    //   setPreviousQuestions(questions)
    // },
    // onError: () => {
    //   setQuestions(previousQuestions)
    //   queryClient.setQueryData(['form', formId], (old: FormDTO) => ({
    //     ...old,
    //     questions: previousQuestions,
    //   }))
    // },
  })

  function onChangeOrder(data: any) {
    const indexSorted = data.map((question: any, index: number) => ({
      ...question,
      index,
    }))
    setQuestions(indexSorted)
    saveReorderChanges(indexSorted)
  }

  const saveReorderChanges = useCallback(
    debounce(async (data) => {
      queryClient.setQueryData(['form', formId], (old: FormDTO) => ({
        ...old,
        questions: data,
      }))
      const newQuestionsOrderIds = data.map(
        (question: QuestionDTO) => question.id,
      )
      await mutateAsync(newQuestionsOrderIds)
    }, 3500),
    [],
  )

  return (
    <div className="relative flex flex-col">
      {isPending && (
      <Loader2 className="absolute -top-2 right-14 z-10 size-4 animate-spin" />
      )}
      {isSuccess && <Check className="absolute -top-2 right-14 z-10 size-4" />}
      {questions ? (
        <SortableList
          items={questions}
          onChange={onChangeOrder}
          renderItem={(item) => (
            <SortableItem
              sortableId={item.id}
              className="flex items-center gap-2"
            >
              <Card
                key={`question-${item.id}`}
                question={item}
                formId={+params.id}
              />
            </SortableItem>
          )}
        />
      ) : (
        [0, 1, 2].map((i) => (
          <Skeleton className="mx-4 my-2 h-40 w-full" key={i} />
        ))
      )}
    </div>
  )
}
