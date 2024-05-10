import { QuestionDTO } from './question'

export interface FormDTO {
  id: string
  name: string
  about: string
  active: boolean
  logoUrl: string
  isPublic: boolean
  topics: string[]
  questions: QuestionDTO[]
  _count?: {
    questions: number
    sessions: number
    topics: number
    responses: number
  }
}
