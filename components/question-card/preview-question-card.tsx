import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'

interface Question {
  id: string
  name: string
  about: string
  active: boolean
  topics: string[]
  logoUrl: null
  isPublic: boolean
  createdAt: string
  endedAt: null
  userId: string
  _count: {
    questions: number
    answers: number
    Sessions: number
  }
}
interface PreviewQuestionCardProps {
  question: Question
}

export function PreviewQuestionCard() {
  return (
    <div className="flex w-full min-w-[320px] cursor-pointer flex-col gap-2 rounded-md p-4 transition-colors hover:bg-stone-200/50">
      <h1 className="text-md font-semibold text-primary">{question.text}</h1>
      <div className="space-y-2">
        <div className="max-h-1' relative rounded-md bg-primary/5">
          <Badge
            className="absolute left-3/4 bg-neutral-200"
            variant="secondary"
          >
            Idade
          </Badge>
        </div>
        <div className="rounded-md bg-primary/5 p-1.5" />
        <div className="rounded-md bg-primary/5 p-1.5" />
        <div className="w-2/5 rounded-md bg-primary/5 p-1.5" />
      </div>
      <div className="mt-2 flex gap-2">
        {question.topics.map((tag) => (
          <Badge variant="default" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
const question = {
  id: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  text: 'Qual é a sua idade?',
  isPublic: false,
  type: 'multiple-choice',
  topics: ['Teste', 'Big data', 'Blockchain'],
  formId: '2ee84efd-0e81-4943-95e3-26aadc7cb2ad',
  topicName: null,
  questionTypeType: null,
  options: [
    {
      id: 'df9c2577-926c-4d85-a6ef-c821d5a138f8',
      text: 'Menos de 18 anos',
      value: 1,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
    {
      id: '48c7ac98-5911-42f9-a2a8-bbd88f983852',
      text: '18-24 anos',
      value: 2,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
    {
      id: 'f688304c-21a0-476f-ae33-646b062e70a6',
      text: '25-34 anos',
      value: 3,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
    {
      id: '4b36087a-5f91-4f59-85c1-41e52e8e8e0f',
      text: '35-44 anos',
      value: 4,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
    {
      id: '1694d2d8-2a52-428a-a10e-ab512f8218c6',
      text: '45-54 anos',
      value: 5,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
    {
      id: '42803f69-4c0c-4e9c-8b6d-9ee1359aaf4e',
      text: '55-64 anos',
      value: 6,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
    {
      id: '3fc2282c-1ff8-4e8e-b383-3dea7fa139c6',
      text: '65 anos ou mais',
      value: 7,
      questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
    },
  ],
}
