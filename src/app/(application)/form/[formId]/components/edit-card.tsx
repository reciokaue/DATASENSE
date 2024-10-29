'use client'

import { Copy, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Question } from '@/src/models'

import { ControlledSwitch } from './controlled-switch'
import { Options } from './options'
import { SelectQuestionType } from './select-type'

interface CardProps {
  question: Question | any
  questionsForm: UseFormReturn<any>
  index: number
}

export function EditCard({ question, questionsForm, index }: CardProps) {
  const { register, control, setValue } = questionsForm

  setValue(`questions.${index}.index`, index)

  return (
    <form className="relative flex w-full flex-col space-y-4 rounded-md bg-white p-6">
      <h2 className="text-base font-medium">Questão {question.index + 1}</h2>

      <div className="flex items-center gap-2">
        <Input
          {...register(`questions.${index}.text`)}
          placeholder="Escreva sua pergunta aqui"
          styles="w-full"
        />
        <SelectQuestionType
          control={control}
          name={`questions.${index}.questionType`}
        />
      </div>

      <Options questionsForm={questionsForm} index={index} />

      <footer className="mt-6 flex items-center justify-between">
        <div>
          {/* <Button variant="ghost" size="icon">
            <CorneUpLeft className="size-5" />
          </Button> */}
          <Button onClick={() => {}} variant="ghost" size="icon">
            <Copy className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="size-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          Obrigatória
          <ControlledSwitch
            control={control}
            name={`questions.${index}.required`}
          />
        </div>
      </footer>
    </form>
  )
}
