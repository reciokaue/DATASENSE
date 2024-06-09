'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { QuestionDTO } from '@/src/DTOs/question'
import { api } from '@/src/lib/api'

import { questionSchema, questionSchemaType } from '../../schemas/question'
import Icon from '../icon'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { LabelDiv } from '../ui/label-div'
import { Options } from './options'
import { Preview } from './preview'
import { SelectQuestionType } from './select'

interface QuestionCardProps {
  question: QuestionDTO
  editing: {
    id: number
    set: (id: number) => void
  }
}

export function QuestionCard({ question, editing }: QuestionCardProps) {
  const questionForm = useForm<questionSchemaType>({
    resolver: zodResolver(questionSchema),
    defaultValues: question,
  })

  const { register, handleSubmit, watch, control, reset } = questionForm
  const questionText = watch('text')
  const questionType = watch('questionType')

  async function handleSign(data: questionSchemaType) {
    const formatedToUpdate = {
      ...data,
      typeId: data?.questionType?.id,
      deletedOptions: (data?.deletedOptions || []).map((option) => option.id),
    }
    delete formatedToUpdate.questionType
    await onUpdateQuestion(formatedToUpdate)
  }
  function handleCancel(event: any) {
    event.preventDefault()
    console.log('A')
    editing.set(0)
  }

  const { mutateAsync: onUpdateQuestion, isPending: isUpdateQuestionPending } =
    useMutation({
      mutationFn: async (newQuestion: any) =>
        await api.put(`/question/${question.id}`, newQuestion),
      onMutate: async (newQuestion: any) => {
        // NEED FIX - atualiza o formulário antigo usando o setQueryData
        // queryClient.setQueryData('items', (old) => [...old, newQuestion])
        reset(newQuestion)
      },
      onError: (err, newQuestion) => {
        console.log(newQuestion, err)
      },
    })

  function onClickCard() {
    if (editing.id === question.id) editing.set(0)
    else editing.set(question.id)
  }

  return (
    <Card className="group relative flex w-full min-w-[520px] flex-col  ">
      <header onClick={onClickCard} className="flex flex-1 gap-4 p-5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {question.index + 1}
        </span>
        <p className="w-full break-words text-left text-lg font-medium leading-relaxed text-neutral-700">
          {questionText}
        </p>
        <label className="flex gap-2 text-sm text-muted-foreground">
          {questionType?.label}
          {questionType?.icon ? <Icon name={questionType?.icon} /> : null}
        </label>
      </header>
      {editing.id === question.id && (
        <form className="flex flex-col gap-3  p-5">
          <LabelDiv title="Questão" labelFor="question">
            <Input id="question" {...register('text')} />
          </LabelDiv>
          <SelectQuestionType
            control={control}
            previousQuestionType={question.questionType}
          />

          {/* <Preview type={questionType} options={formOptions} /> */}

          <Options useForm={questionForm} />

          <div className="mt-3 flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(handleSign, console.log)}
              type="submit"
              className="gap-2 bg-primary"
            >
              Salvar questão {isUpdateQuestionPending ? <Loader2Icon /> : null}
              {/* <Check size={20} /> */}
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}
