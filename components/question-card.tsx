interface QuestionCardProps {
  item: { id: number }
}

export function QuestionCard({ item }: QuestionCardProps) {
  return (
    <div className="flex rounded-md border p-10">
      QuestionCard {JSON.stringify(item)}
    </div>
  )
}
