import { Button } from '@/src/components/ui/button'
import { Textarea } from '@/src/components/ui/textarea'
import { OptionDTO } from '@/src/DTOs/option'
import { QuestionTypeDTO } from '@/src/DTOs/questionType'

interface QuestionsProps {
  type: QuestionTypeDTO
  options?: OptionDTO[]
}

export function Questions({ type, options }: QuestionsProps) {
  if (type.name === 'text')
    return (
      <Textarea
        className=" h-auto min-h-64 self-end rounded-xl  bg-stone-200 text-xl"
        maxLength={500}
        placeholder="Fale sobre..."
      />
    )

  return (
    <div className="flex h-fit flex-wrap justify-center gap-6">
      {options?.map((option) => (
        <Button key={option.id} size="xl" variant="secondary">
          {option.text}
        </Button>
      ))}
    </div>
  )
}

// const questionType = [
//   {
//     id: 4,
//     name: 'emoji',
//     label: 'Emojis',
//     icon: 'Smile',
//   },
//   {
//     id: 1,
//     name: 'options',
//     label: 'Opções',
//     icon: 'CircleDot',
//   },
//   {
//     id: 2,
//     name: 'multiple_choice',
//     label: 'Multiplas opções',
//     icon: 'CircleDot',
//   },
//   {
//     id: 3,
//     name: 'text',
//     label: 'Texto',
//     icon: 'Ampersand',
//   },
// ]
