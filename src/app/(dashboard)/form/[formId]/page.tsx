'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardType, Mails } from 'lucide-react'

import { QuestionCard } from '@/src/components/question-card'
import { Button } from '@/src/components/ui/button'
import { FormDTO } from '@/src/DTOs/form'
import { QuestionDTO } from '@/src/DTOs/question'
import { api } from '@/src/lib/api'

import { PageFormSlugProps } from './layout'

export default function FormDetail({ params }: PageFormSlugProps) {
  const { formId } = params

  const { data: form } = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const response = await api.get(`/form/${formId}`)
      return response.data as FormDTO
    },
  })

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="pb-2 text-2xl font-semibold">{form?.name || ''}</h1>
      <p>{form?.about || ''}</p>
      <Button link={`/form/${formId}/edit`}>Editar</Button>
      <div className="mt-2 flex gap-3">
        <div className="flex items-center gap-2">
          <ClipboardType className="h-3 w-3 text-violet-400" />
          {form?._count.questions || 0}
        </div>
        <div className="flex items-center gap-2">
          <Mails className="h-3 w-3 text-sky-400" />
          {form?._count?.sessions || 0}
        </div>
      </div>
      <h1>Questões</h1>
      {form &&
        form.questions.map((question: QuestionDTO) => (
          <QuestionCard
            key={question.id}
            data={question}
            responses={question?._count.responses || 1}
          />
        ))}
    </div>
  )
}
