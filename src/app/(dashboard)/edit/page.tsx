'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'

import { QuestionCard } from '@/src/components/question'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { FormDTO } from '@/src/DTOs/form'
import { QuestionDTO } from '@/src/DTOs/question'
import { api } from '@/src/lib/api'

export default function Edit() {
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  const [editingQuestionId, setEditingQuestionId] = useState(0)
  const queryClient = useQueryClient()

  const { data: form } = useQuery({
    queryKey: ['form', 2],
    queryFn: async () => {
      const response = await api.get(`/form/${2}`)
      setQuestions(response.data.questions)
      return response.data as FormDTO
    },
  })

  function onChangeOrder(data: any) {
    const indexSorted = data.map((question: any, index: number) => ({
      ...question,
      index,
    }))
    queryClient.setQueryData(['form', 2], {
      ...form,
      questions: indexSorted,
    })

    setQuestions(indexSorted)
  }

  if (!form)
    return (
      <div className="flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    )

  return (
    <div>
      <div className="flex flex-col space-y-1">
        {/* <input type="text" defaultValue={form?.id} /> */}
        {/* <input type="text" defaultValue={form?.name} />
        <input type="text" defaultValue={form?.about} />
        <input type="text" defaultValue={String(form?.active)} />
        <input type="text" defaultValue={form?.logoUrl} />
        <input type="text" defaultValue={String(form?.isPublic)} />
        <input type="text" defaultValue={form?.createdAt} /> */}
        <div className="ml-4 flex flex-col space-y-4 pt-4">
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
      </div>
    </div>
  )
}
