'use client'
import { useQuery } from '@tanstack/react-query'

import { QuestionCard } from '@/src/components/question/index'
import { Options } from '@/src/components/question/options'
import { FormDTO } from '@/src/DTOs/form'
import { api } from '@/src/lib/api'

import { FormLayoutProps } from '../layout'

export default function FormQuestions({ params }: FormLayoutProps) {
  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const response = await api.get(`/forms/${params.formId}`)
      return response.data as FormDTO
    },
  })

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      {form &&
        form.questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      {/* {form?.questions[0]?.options && (
        <Options data={form?.questions[0].options} />
      )} */}
    </div>
  )
}
