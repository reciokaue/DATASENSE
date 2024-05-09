'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { QuestionCard } from '@/src/components/question-card'
import {
  QuestionInput,
  QuestionOutput,
  QuestionSchema,
} from '@/src/schemas/form'

export default function CreateQuestionPage() {
  const form = useForm<QuestionInput, any, QuestionOutput>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      type: 'options',
      text: 'Questão',
      options: [{ text: 'Opção', value: 1 }],
    },
  })

  return (
    <div className="mx-auto flex max-w-2xl justify-center pt-20">
      <QuestionCard form={form} item={{ id: 1 }} />
    </div>
  )
}
