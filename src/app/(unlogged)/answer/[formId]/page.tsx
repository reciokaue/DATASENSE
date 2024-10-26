'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { getFormQuestions } from '@/src/api/get-form-questions'
import { Button } from '@/src/components/ui/button'

import { Questions } from './questions'

export default function AnswerPage({ params }: { params: { formId: string } }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const { push } = useRouter()

  const { data: questions } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: () => getFormQuestions(params.formId),
  })

  if (!questions)
    return <Loader2 className="fixed left-1/2 top-1/2 size-5 animate-spin" />

  const question = questions[questionIndex]
  const progress = (questionIndex * 100) / questions.length

  function nextQuestion() {
    if (questions && questionIndex + 1 >= questions?.length)
      return push('/answer/success')

    setQuestionIndex(questionIndex + 1)
  }

  return (
    <main className="mx-auto flex h-screen max-w-xl flex-col overflow-hidden rounded-2xl">
      <header className="flex p-8 pb-0">
        <Progress className="h-5" value={progress + 10} />
      </header>

      <h1 className="text-wrap break-all p-8 text-2xl font-semibold">
        {question.text}
      </h1>

      <section className="flex h-full flex-1 p-8">
        <Questions type={question.questionType} options={question.options} />
      </section>

      <footer className="flex flex-col space-y-4 p-8">
        <h2 className="invisible text-base font-medium">Obrigado</h2>
        <Button onClick={nextQuestion} className="h-14 text-xl">
          Continuar
        </Button>
      </footer>
    </main>
  )
}
