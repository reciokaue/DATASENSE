import { QuestionDTO } from './question'
import { TopicDTO } from './topic'

export interface FormDTO {
  id: number
  name: string
  about: string
  active: boolean
  logoUrl: string
  isPublic: boolean
  createdAt: string
  questions: QuestionDTO[]
  topics: TopicDTO[]
}
