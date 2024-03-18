import { LabelDiv } from '../ui/label-div'
import { Cards } from './types/cards'
import { Classification } from './types/classification'
import { EmojiScale } from './types/emoji'
import { Options } from './types/options'
import { Text } from './types/text'

interface PreviewProps {
  type: 'cards' | 'options' | 'emoji' | 'classification' | 'text'
  options?: {
    id: string
    text: string
    value: number
    questionId: string
    emoji?: string
  }[]
}

export function Preview({ type, options }: PreviewProps) {
  return (
    <div className="flex">
      <LabelDiv
        title="Preview"
        tooltip="Este é o formato das questões que o usuário vai responder"
        styles="bg-stone-100 rounded-lg p-6 flex gap-3 justify-center items-center flex-wrap"
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