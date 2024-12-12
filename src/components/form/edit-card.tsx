'use client'

import { Copy, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
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
  const { register, control, getValues } = formObject

  const questionResponses = getValues(`questions.${index}._count.responses`)

  return (
    <form className="relative flex w-full flex-col space-y-4 rounded-lg border border-border bg-white px-6 py-3">
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
          {questionResponses === 0 || !questionResponses ? (
            <Button
              onClick={() => actions.removeQuestion(index)}
              type="button"
              variant="ghost"
              size="icon"
              className="hover:text-red-500"
            >
              <Trash2 className="size-5" />
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:text-red-500"
                >
                  <Trash2 className="size-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="max-w-[200px] space-y-2">
                <p className=" text-balance text-sm">
                  Essa questão tem {questionResponses} respostas, eluindo todos
                  os dados serão perdidos
                </p>

                <Button
                  onClick={() => actions.removeQuestion(index)}
                  variant="destructive"
                >
                  Excluir mesmo assim
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex items-center gap-2">
          Obrigatória
          <Switch control={control} name={`questions.${index}.required`} />
        </div>
      </footer>
    </form>
  )
}
