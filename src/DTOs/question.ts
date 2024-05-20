import { OptionDTO } from './option'
import { QuestionTypeDTO } from './questionType'

export interface QuestionDTO {
  id: number
  text: string
  index: number
  questionType: QuestionTypeDTO
  options: OptionDTO[]
}
