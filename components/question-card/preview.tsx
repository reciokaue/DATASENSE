import { LabelDiv } from '../ui/label-div'
import { Cards } from './types/cards'
import { Classification } from './types/classification'
import { EmojiScale } from './types/emoji'
import { Options } from './types/options'
import { Text } from './types/text'

interface PreviewProps {
  type: 'cards' | 'options' | 'emoji' | 'classification' | 'text' | string
  options?: {
    id: string
    text: string
    value: number
    questionId: string
    emoji?: string | undefined
  }[]
}

export function Preview({ type, options }: PreviewProps) {
  return (
    <div className="flex w-full">
      <LabelDiv
        title="Preview"
        tooltip="Este é o formato das questões que o usuário vai responder"
        className="flex min-h-[150px] flex-wrap items-center justify-center gap-3 rounded-lg bg-stone-100 p-6"
      >
        {options &&
          {
            options: <Options options={options} />,
            cards: <Cards options={options} />,
            emoji: <EmojiScale options={options} />,
            classification: <Classification options={options} />,
            text: <Text />,
          }[type]}
      </LabelDiv>
    </div>
  )
}
