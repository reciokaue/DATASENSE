'use client'

import { Copy, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Switch } from '@/src/components/ui/switch'
import { Question } from '@/src/models'

import { Options } from './options'
import { SelectQuestionType } from './select-type'

interface CardProps {
  question: Question | any
  formObject: UseFormReturn<any>
  index: number
}

export function EditCard({ question, formObject, index }: CardProps) {
  const { register, control, setValue } = formObject

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

      <Options formObject={formObject} index={index} />

      <footer className="mt-6 flex items-center justify-between">
        <div>
          {/* <Button variant="ghost" size="icon">
            <CornerUpLeft className="size-5" />
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
          <Switch control={control} name={`questions.${index}.required`} />
        </div>
      </footer>
    </form>
  )
}
