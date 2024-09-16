import { OptionDTO } from './option'
import { QuestionTypeDTO } from './questionType'

export interface QuestionDTO {
  id: number
  text: string
  index: number
  required: boolean
  questionType: QuestionTypeDTO
  options: OptionDTO[]
  _count: {
    responses: number
  }
}
