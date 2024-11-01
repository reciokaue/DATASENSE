import { useState } from 'react'

import { Button } from '@/src/components/ui/button'
import { DatePicker } from '@/src/components/ui/date-picker'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { TimePicker } from '@/src/components/ui/time-picker'
import { cn } from '@/src/lib/utils'
import { Question } from '@/src/models'

interface OptionsProps {
  question?: Partial<Question>
  index: number
}

export function QuestionOptions({ question, index }: OptionsProps) {
  if (!question) return null

  return (
    <section className="flex w-full flex-col">
      <div className="mb-3 flex items-center gap-2 space-x-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary p-2 text-primary-foreground">
          {index + 1}
        </span>
        {question.questionType?.label}
      </div>
      <h1 className="mb-6 text-2xl font-bold text-primary">{question.text}</h1>
      {optionType(question)}
    </section>
  )
}

const optionType = (question: any) => {
  const components: any = {
    text: <Text question={question} />,
    longText: <LongText question={question} />,
    options: <Options question={question} />,
    starRating: <StarRating question={question} />,
    list: <List question={question} />,
    phone: <Phone question={question} />,
    email: <Email question={question} />,
    time: <Time question={question} />,
    date: <DateOption question={question} />,
  }

  return components[question?.questionType?.name]
}

// Tipos de perguntas individuais

function Text({ question }: { question: Question }) {
  return (
    <Input
      className="border-3 h-auto px-4 py-4 text-xl"
      placeholder="Digite sua resposta aqui..."
    />
  )
}
function LongText({ question }: { question: Question }) {
  return (
    <Textarea
      className="border-3 h-48 w-full resize-none px-4 py-4 text-xl"
      maxLength={500}
      placeholder="Digite sua resposta aqui..."
    />
  )
}
function Options({ question }: { question: Question }) {
  return (
    <div className="flex h-fit flex-wrap justify-center gap-6">
      {question?.options?.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="border-3 h-auto px-4 py-4 text-xl"
        >
          {option.text}
        </Button>
      ))}
    </div>
  )
}

function StarRating({ question }: { question: Question }) {
  const [rating, setRating] = useState<number>(0)

  return (
    <div className="flex w-full items-center justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={cn([
            'text-8xl',
            star <= rating ? 'text-yellow-400' : 'text-gray-400',
          ])}
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function List({ question }: { question: Question }) {
  return (
    <div className="flex flex-col justify-start gap-2">
      {question?.options?.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="border-3 h-auto px-4 py-3 text-xl"
        >
          {option.text}
        </Button>
      ))}
    </div>
  )
}

function Phone({ question }: { question: Question }) {
  return (
    <Input
      type="tel"
      placeholder="(XX) XXXXX-XXXX"
      className="border-3 h-auto px-4 py-4 text-xl"
    />
  )
}

function Email({ question }: { question: Question }) {
  return (
    <Input
      type="email"
      placeholder="seuemail@exemplo.com"
      className="border-3 h-auto px-4 py-4 text-xl"
    />
  )
}
function Time({ question }: { question: Question }) {
  return <TimePicker date={new Date()} setDate={() => {}} />
}
function DateOption({ question }: { question: Question }) {
  return <DatePicker />
}
