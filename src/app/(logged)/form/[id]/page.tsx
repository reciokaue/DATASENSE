'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeftCircleIcon, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getForms } from '@/src/api/get-form'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { QuestionDTO } from '@/src/DTOs/question'

import { PageHeader, PageWrapper } from '../../layout'
import { Card } from './card'

export default function Page({ params }: { params: { id: string } }) {
  const [questions, setQuestions] = useState<QuestionDTO[]>([])

  const queryClient = useQueryClient()
  const navigation = useRouter()

  const { data: form } = useQuery({
    queryKey: ['form', params.id],
    queryFn: async () => {
      const data = await getForms(params.id)
      setQuestions(data.questions)
      return data
    },
  })

  function onChangeOrder(data: any) {
    const indexSorted = data.map((question: any, index: number) => ({
      ...question,
      index,
    }))
    queryClient.setQueryData(['form', params.id], (old: FormData) => {
      return {
        ...old,
        questions: indexSorted,
      }
    })

    setQuestions(indexSorted)
  }

  // implementar rotina que a cada mudança espera por
  // uma proxima, se não ocorrer ele vai e salva

  return (
    <>
      <PageHeader>
        <Button
          onClick={navigation.back}
          variant="ghost"
          size="icon"
          className="mr-2 rounded-full text-primary/60"
        >
          <ChevronLeftCircleIcon />
        </Button>
        <h2 className="w-full text-xl font-semibold text-primary">
          {form?.name}
        </h2>

        <Button>
          Compartilhar
          <ExternalLink className="size-4" />
        </Button>
      </PageHeader>
      <PageWrapper>
        {form?.questions && (
          <SortableList
            items={questions}
            onChange={onChangeOrder}
            renderItem={(item) => (
              <SortableItem
                sortableId={item.id}
                className="flex items-center gap-2"
                // isEditing={editingQuestionId === 0}
              >
                <Card
                  key={`question-${item.id}`}
                  question={item}
                  formId={+params.id}
                />
              </SortableItem>
            )}
          />
        )}

        {JSON.stringify(form)}
      </PageWrapper>
    </>
  )
}
