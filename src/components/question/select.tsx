import { Controller } from 'react-hook-form'

import { useQuestionType } from '@/src/contexts/questionType'

import { LabelDiv } from '../ui/label-div'
import { Dropdown } from '../ui/select'

interface SelectProps {
  control: any
}

export function SelectQuestionType({ control }: SelectProps) {
  const { questionTypes } = useQuestionType()

  return (
    <div className="flex items-center justify-between gap-4">
      <LabelDiv
        title="Tipo de questão"
        tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
      >
        <Controller
          control={control}
          name="typeId"
          render={(type) => (
            <Dropdown
              setSelected={(t: any) => type.field.onChange(t)}
              placeholder="Selecione um tipo..."
              options={questionTypes}
            />
          )}
        />
      </LabelDiv>
    </div>
  )
}
