import { Smile } from 'lucide-react'

interface EmojiScaleProps {
  options: {
    id: string
    text: string
    value: number
    icon?: string
    questionId: string
  }[]
}

export function EmojiScale({ options }: EmojiScaleProps) {
  return (
    <div className="grid grid-flow-col">
      {options.map((option) => (
        <button
          className="aspect-square rounded-full bg-transparent p-2 transition-colors hover:bg-background"
          onClick={(e) => e.preventDefault()}
          key={`${option.id}-emoji`}
        >
          <span className="h-12 text-5xl">
            {option.emoji || (
              <Smile className="h-14 w-14 text-muted-foreground" />
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
