import { Controller } from 'react-hook-form'

import { useQuestionType } from '@/src/contexts/questionType'
import { QuestionTypeDTO } from '@/src/DTOs/questionType'

import { LabelDiv } from '../ui/label-div'
import { Dropdown } from '../ui/select'

interface SelectProps {
  control: any
  previousQuestionType?: QuestionTypeDTO
}

export function SelectQuestionType({
  control,
  previousQuestionType,
}: SelectProps) {
  const { questionTypes } = useQuestionType()

  return (
    <div className="flex items-center justify-between gap-4">
      <LabelDiv
        title="Tipo de questão"
        tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
      >
        <Controller
          control={control}
          name="questionType"
          render={(questionType) => (
            <Dropdown
              setSelected={(type: string) =>
                questionType.field.onChange(JSON.parse(type))
              }
              placeholder={
                previousQuestionType?.label || 'Selecione um tipo...'
              }
              options={questionTypes}
            />
          )}
        />
      </LabelDiv>
    </div>
  )
}
