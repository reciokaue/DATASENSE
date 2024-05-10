import { OptionDTO } from './option'

export interface QuestionDTO {
  id: string
  text: string
  type: string
  isPublic: boolean
  topics: string[]
  options: OptionDTO[]
  responses?: number
}
