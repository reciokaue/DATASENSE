'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Copy, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { QuestionDTO } from '@/src/DTOs/question'
import {
  questionSchema,
  questionSchemaType,
} from '@/src/utils/schemas/question'

import { ControlledSwitch } from './controlled-switch'
import { SelectQuestionType } from './select-type'

interface CardProps {
  question: QuestionDTO
}

const questionTypes = [
  {
    id: 1,
    name: 'options',
    label: 'Opções',
    icon: 'CircleDot',
  },
  {
    id: 3,
    name: 'text',
    label: 'Texto',
    icon: 'Ampersand',
  },
]

export function Card({ question }: CardProps) {
  const questionForm = useForm<questionSchemaType>({
    resolver: zodResolver(questionSchema),
    defaultValues: question,
  })

  const { register, handleSubmit, watch, control, reset, formState } =
    questionForm

  // const questionText = watch('text')
  // const questionType = watch('questionType')

  useEffect(() => {
    if (formState.isDirty) {
      const timeoutId = setTimeout(() => {
        console.log('aaaaa', questionForm.getValues())
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [formState.isDirty, questionForm])

  return (
    <div className="flex w-full flex-col rounded-md bg-white p-6">
      <h2 className="mb-2 text-base font-medium">Questão</h2>
      <div className="flex items-center gap-2">
        <Input
          {...register('text')}
          placeholder="Escreva sua pergunta aqui"
          styles="w-full"
        />
        <SelectQuestionType control={control} />
      </div>
      <h1>foi alterado {JSON.stringify(formState.isDirty)}</h1>

      <footer className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          Obrigatória <ControlledSwitch control={control} />
        </div>

        <div>
          <Button variant="ghost" size="icon">
            <Copy className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="size-5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
