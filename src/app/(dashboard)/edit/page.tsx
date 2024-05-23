'use client'

import { useQuery } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'

import { QuestionCard } from '@/src/components/question'
import { FormDTO } from '@/src/DTOs/form'
import { api } from '@/src/lib/api'

export default function Edit() {
  const [editingQuestionId, setEditingQuestionId] = useState(0)

  const { data: form } = useQuery({
    queryKey: ['form', 2],
    queryFn: async () => {
      const response = await api.get(`/form/${2}`)
      return response.data as FormDTO
    },
  })

  return (
    <div>
      {form ? (
        <div className="flex flex-col space-y-1">
          <input type="text" value={form?.id} />
          <input type="text" value={form?.name} />
          <input type="text" value={form?.about} />
          <input type="text" value={String(form?.active)} />
          <input type="text" value={form?.logoUrl} />
          <input type="text" value={String(form?.isPublic)} />
          <input type="text" value={form?.createdAt} />
          <div className="ml-4 flex flex-col space-y-4 pt-4">
            {form?.questions.map((question) => (
              <QuestionCard
                key={`question-${question.id}`}
                question={question}
                editing={{ id: editingQuestionId, set: setEditingQuestionId }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
    </div>
  )
}
