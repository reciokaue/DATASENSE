import { QuestionTypeDTO } from '@/src/DTOs/questionType'

import Icon from '../icon'

interface HeaderProps {
  typeId: number
  text: string
  index: number
  types?: QuestionTypeDTO[]
}

export function Header({ typeId, text, types, index }: HeaderProps) {
  const type = types?.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc
  }, {})

  return (
    <header>
      <div className="flex flex-1 gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {index}
        </span>
        <p className="w-full break-words text-left text-lg font-medium leading-relaxed text-neutral-700">
          {text}
        </p>
        {type && (
          <label className="flex gap-2 text-sm text-muted-foreground">
            {type[typeId].label} <Icon name={type[typeId].icon} />
          </label>
        )}
      </div>
    </header>
  )
}
