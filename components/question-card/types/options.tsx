interface OptionsProps {
  options: {
    id: string
    text: string
    value: number
    questionId: string
  }[]
}

export function Options({ options }: OptionsProps) {
  return options.map((option) => (
    <button
      className="h-10 items-center justify-center rounded-md bg-background px-4 py-2 transition-colors hover:bg-accent "
      onClick={(e) => e.preventDefault()}
      key={option.id}
    >
      <p className="text-sm font-medium hover:text-accent-foreground">
        {option.text}
      </p>
    </button>
  ))
}
