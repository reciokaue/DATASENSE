import { QuestionCard } from '@/components/question-card'

export default function QuestionsPage() {
  return (
    <div className="mx-auto flex max-w-2xl justify-center pt-20">
      <QuestionCard item={{ id: 1 }} />
    </div>
  )
}
