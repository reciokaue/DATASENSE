'use client'

import { useQuery } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'

import { getQuestionTypes } from '@/src/api/get-question-types'
import { Dropdown } from '@/src/components/ui/select'

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
        render={(questionType) => (
          <Dropdown
            setSelected={(type: string) =>
              questionType.field.onChange(JSON.parse(type))
            }
            placeholder={questionType?.field?.value?.label}
            options={questionTypes}
          />
        )}
      />
    </div>
  )
}
