import { QuestionDTO } from './question'
import { TopicDTO } from './topic'

export interface FormDTO {
  id: number
  name: string
  description: string
  active: boolean
  logoUrl: string
  isPublic: boolean
  createdAt: string
  questions: QuestionDTO[]
  category: TopicDTO[]
  _count: {
    questions: number
    sessions: number
  }
}
