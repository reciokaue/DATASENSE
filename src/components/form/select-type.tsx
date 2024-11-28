'use client'

import { useQuery } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'

import { getQuestionTypes } from '@/api/get-question-types'
import { Dropdown } from '@/components/ui/select'
import { QuestionType } from '@/models'

interface SelectProps {
  control: any
  name: string
}

export function SelectQuestionType({ control, name }: SelectProps) {
  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: getQuestionTypes,
  })

  return (
    <div className="flex flex-col  items-start gap-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Dropdown
              setSelected={(type: QuestionType) => field.onChange(type)}
              placeholder={field?.value?.label}
              options={questionTypes}
            />
          </>
        )}
      />
    </div>
  )
}
