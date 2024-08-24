'use client'

import { useQuery } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'

import { Dropdown } from '@/src/components/ui/select'
import { getQuestionTypes } from '@/src/api/get-question-types'

interface SelectProps {
  control: any
}

export function SelectQuestionType({ control }: SelectProps) {
  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: getQuestionTypes,
  })

  return (
    <div className="flex flex-col  items-start gap-2">
      <Controller
        control={control}
        name="questionType"
        render={(questionType) => (
          <Dropdown
            setSelected={(type: string) =>
              questionType.field.onChange(JSON.parse(type))
            }
            placeholder={control._fields.questionType._f.value.label}
            options={questionTypes}
          />
        )}
      />
    </div>
  )
}
