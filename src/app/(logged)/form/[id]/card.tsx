'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Copy, Loader2, Trash2 } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateQuestion } from '@/src/api/update-question'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { FormDTO } from '@/src/DTOs/form'
import { QuestionDTO } from '@/src/DTOs/question'
import { debounce } from '@/src/utils/debounce'
import {
  questionSchema,
  questionSchemaType,
} from '@/src/utils/schemas/question'

import { ControlledSwitch } from './controlled-switch'
import { SelectQuestionType } from './select-type'

interface CardProps {
  question: QuestionDTO
  formId: number
}

export function Card({ question, formId }: CardProps) {
  const questionForm = useForm<questionSchemaType>({
    resolver: zodResolver(questionSchema),
    defaultValues: question,
  })

  const queryClient = useQueryClient()

  const {
    register,
    control,
    reset,
    formState,
    handleSubmit,
    watch,
    getValues,
  } = questionForm
  const index = watch('index')

  const { mutateAsync: onUpdateQuestion, isPending: isQuestionUpdating } =
    useMutation({
      mutationFn: updateQuestion,
      onMutate: async (newQuestion: any) => {
        console.log(newQuestion)
        queryClient.setQueryData(['form', formId], (oldData: FormDTO) => {
          console.log(oldData)
          return {
            ...oldData,
            questions: oldData.questions,
          }
        })

        reset(newQuestion)
      },
      onError: (err, newQuestion) => {
        console.log(newQuestion, err)
        reset(newQuestion)
      },
    })

  const debouncedSaveData = useCallback(
    debounce((data) => onUpdateQuestion(data), 1000),
    [],
  )

  const formData: FormDTO = queryClient.getQueryData(['form', formId])

  function onSave(data: questionSchemaType) {
    if (!formState.isDirty) return

    // reset(data)
    debouncedSaveData(data)
    console.log('SAVING')
  }

  useEffect(() => {
    const data = questionSchema.parse(getValues())
    onSave(data)
  }, [index])

  return (
    <form
      onBlur={handleSubmit(onSave)}
      onChange={handleSubmit(onSave)}
      className="relative flex w-full flex-col rounded-md bg-white p-6"
    >
      <h2 className="mb-2 text-base font-medium">Questão {question.index}</h2>
      {isQuestionUpdating && (
        <Loader2 className="absolute right-6 top-6 size-4 animate-spin" />
      )}
      <div
        className={`absolute bottom-4 right-4 size-4 h-4 w-4 rounded-full ${formState.isDirty ? 'bg-red-500' : 'bg-green-500'}`}
      />

      <div className="flex items-center gap-2">
        <Input
          {...register('text')}
          placeholder="Escreva sua pergunta aqui"
          styles="w-full"
        />
        <SelectQuestionType control={control} />
      </div>

      <footer className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          Obrigatória <ControlledSwitch control={control} />
          {watch('required') ? 'TRUE' : 'FALSE'}
        </div>

        <div>
          {/* <Button variant="ghost" size="icon">
            <CorneUpLeft className="size-5" />
          </Button> */}
          <Button variant="ghost" size="icon">
            <Copy className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="size-5" />
          </Button>
        </div>
      </footer>
      {JSON.stringify(formData || 'A')}
    </form>
  )
}
