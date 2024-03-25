import { Ampersand, CircleDot, Copy, Smile, WrapText } from 'lucide-react'
import { ReactNode } from 'react'

interface QuestionInfoItem {
  label: string
  value: string
  Icon: ReactNode
}

interface HeaderProps {
  questionType: string
  questionText: string
  index: number
}

const questionInfo: {
  [key: string]: QuestionInfoItem
} = {
  options: { label: 'Opções', value: 'options', Icon: <CircleDot size={20} /> },
  cards: { label: 'Cards', value: 'cards', Icon: <Copy size={20} /> },
  emoji: { label: 'Emoji', value: 'emoji', Icon: <Smile size={20} /> },
  classification: {
    label: 'Classificação',
    value: 'classification',
    Icon: <WrapText size={20} />,
  },
  text: { label: 'Texto', value: 'text', Icon: <Ampersand size={20} /> },
}

export function Header({ questionText, questionType, index }: HeaderProps) {
  return (
    <header>
      <section className="mb-1 flex items-center justify-end">
        {/* <label className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          <SmilePlus size={20} /> 1
        </label> */}
        <label className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          {questionInfo[questionType].label} {questionInfo[questionType].Icon}
        </label>
      </section>
      <div className="flex flex-1 gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {index}
        </span>
        <p className="w-full break-words text-left text-lg font-medium leading-relaxed text-neutral-700">
          {questionText}
        </p>
      </div>
    </header>
  )
}
