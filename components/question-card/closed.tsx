import { CircleDot } from 'lucide-react'

import { QuestionSchema } from '@/utils/schemas/form'

import { TagList } from '../ui/tag-list'

interface ClosedProps {
  index: number
  question: QuestionSchema
}

export function QuestionCardClosed({ question, index }: ClosedProps) {
  return (
    <div className="group relative flex w-full max-w-xl flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-1 gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {index + 1}
        </span>
        <p className="w-full text-lg font-medium leading-relaxed text-neutral-700">
          {question.text}
          {JSON.stringify(question.topics)}
        </p>
      </div>
      <header className="mb-4 flex items-center justify-between">
        <TagList tags={question.topics || []} />
        <label className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          {question.type} <CircleDot size={20} />
        </label>
      </header>
    </div>
  )
}
