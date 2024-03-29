interface CardsProps {
  options: {
    id: string
    text: string
    value: number
    icon?: string
    questionId: string
    emoji?: string
  }[]
}

export function Cards({ options }: CardsProps) {
  return (
    <div className="grid grid-cols-2 content-center gap-3">
      {options.map((option) => (
        <button
          className="flex h-48 w-36 flex-col  items-center justify-center gap-2 rounded-2xl bg-background  p-4 font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={(e) => e.preventDefault()}
          key={`${option.id}-card`}
        >
          <span className="h-12 text-5xl">{option.emoji || ''}</span>
          <p className="min-h-12 break-all">{option.text}</p>
        </button>
      ))}
    </div>
  )
}
