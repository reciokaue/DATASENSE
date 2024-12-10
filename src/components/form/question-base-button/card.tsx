import { Card as CardBase } from '@/components/ui/card'
import { Question } from '@/models'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: Question
}

export function Card({ question, ...rest }: CardProps) {
  return (
    <CardBase
      className="cursor flex h-auto max-w-[250px] gap-2 overflow-hidden px-4 py-2 ring-primary hover:ring-2 aria-selected:ring-2"
      {...rest}
    >
      <div className="flex w-full flex-col ">
        <h2 className="text-wrap break-words text-start text-base font-medium">
          {question.text}
        </h2>
        <div className="flex h-fit flex-wrap justify-start gap-1 pt-2">
          {question.options.length > 0 &&
            ['list', 'options'].includes(question.questionType.name) &&
            question?.options?.map((option: any) => (
              <p key={option.id}>- {option.text}</p>
            ))}
        </div>
      </div>
    </CardBase>
  )
}
