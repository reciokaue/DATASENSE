'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeftCircleIcon, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { getForm } from '@/src/api/get-form'
import { reorderQuestions } from '@/src/api/reorder-questions'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { FormDTO } from '@/src/DTOs/form'
import { QuestionDTO } from '@/src/DTOs/question'
import { debounce } from '@/src/utils/debounce'

import { PageHeader, PageWrapper } from '../../../layout'
import { Card } from './card'

export default function Page({ params }: { params: { id: string } }) {
  const [questions, setQuestions] = useState<QuestionDTO[]>([])

  const queryClient = useQueryClient()
  const navigation = useRouter()
  const formId = +params.id

  const { data: form } = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      setQuestions(data.questions)
      return data
    },
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
    debounce((data) => {
      queryClient.setQueryData(['form', formId], (old: FormDTO) => {
        return {
          ...old,
          questions: data,
        }
      })
      reorderQuestions(data)
    }, 2000),
    [],
  )

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
        {questions && (
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
        )}
      </PageWrapper>
    </>
  )
}
