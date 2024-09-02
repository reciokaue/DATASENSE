'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeftCircleIcon, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { getForm } from '@/src/api/get-form'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { FormDTO } from '@/src/DTOs/form'

import { PageHeader, PageWrapper } from '../../../layout'
import { Card } from './card'

export default function Page({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient()
  const navigation = useRouter()
  const formId = +params.id

  const { data: form } = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      return data
    },
  })

  function onChangeOrder(data: any) {
    const indexSorted = data.map((question: any, index: number) => ({
      ...question,
      index,
    }))
    queryClient.setQueryData(['form', formId], (old: FormDTO) => {
      return {
        ...old,
        questions: indexSorted,
      }
    })
  }

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
            items={form?.questions}
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
      </PageWrapper>
    </>
  )
}
