'use client'
import { useQuery } from '@tanstack/react-query'

import { QuestionCardClosed } from '@/components/question-card/closed'
import { api } from '@/lib/api'

import { FormLayoutProps } from '../layout'

export default function FormQuestions({ params }: FormLayoutProps) {
  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const response = await api.get(`/forms/${params.formId}`)
      return response.data
    },
  })

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      {form &&
        form.questions.map((question: any, index: number) => (
          <QuestionCardClosed
            key={question.id}
            question={question}
            index={index}
          />
        ))}
    </div>
  )
}
