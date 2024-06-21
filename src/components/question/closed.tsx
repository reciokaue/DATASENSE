import { CircleDot } from 'lucide-react'

import { questionSchemaType } from '@/src/schemas/question'

// import { TagList } from '../ui/tag-list'

interface ClosedProps {
  index: number
  question: questionSchemaType
}

export function QuestionCardClosed({ question, index }: ClosedProps) {
  return (
    <div className="group relative flex w-full max-w-xl flex-col rounded-lg border bg-card p-4 pt-1 text-card-foreground shadow-sm">
      <header className="flex items-start justify-end pt-2">
        {/* <TagList tags={question.topics || []} icon="no-icon" className="pt-0" /> */}
        <div className="flex items-center gap-2  text-sm text-muted-foreground">
          {question.questionType?.label} <CircleDot size={20} />
        </div>
      </header>
      <div className="flex flex-1 gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {index + 1}
        </span>
        <p className="w-full text-lg font-medium leading-relaxed text-neutral-700">
          {question.text}
        </p>
      </div>
    </div>
  )
}
