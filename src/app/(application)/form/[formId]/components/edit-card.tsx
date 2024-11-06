'use client'

import { Copy, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Switch } from '@/src/components/ui/switch'

import { Options } from './options'
import { SelectQuestionType } from './select-type'

interface CardProps {
  formObject: UseFormReturn<any>
  index: number
  actions: {
    removeQuestion: (index: number) => void
    cloneQuestion: (index: number) => void
  }
}

export function EditCard({ formObject, index, actions }: CardProps) {
  const { register, control, setValue } = formObject

  setValue(`questions.${index}.index`, index)

  return (
    <form className="relative flex w-full flex-col space-y-4 bg-white px-6 py-3">
      <h2 className="text-base font-medium">Questão {index + 1}</h2>

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
          {/* TODO undo change question */}
          <Button
            onClick={() => actions.cloneQuestion(index)}
            type="button"
            variant="ghost"
            size="icon"
          >
            <Copy className="size-5" />
          </Button>
          <Button
            onClick={() => actions.removeQuestion(index)}
            type="button"
            variant="ghost"
            size="icon"
            className="hover:text-red-500"
          >
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
