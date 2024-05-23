'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { useState } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import { z } from 'zod'

import { QuestionDTO } from '@/src/DTOs/question'
import { QuestionTypeDTO } from '@/src/DTOs/questionType'
import { api } from '@/src/lib/api'

import { QuestionSchema, QuestionSchemaType } from '../../schemas/form'
import { TopicPicker } from '../topic-picker'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { LabelDiv } from '../ui/label-div'
import { Dropdown } from '../ui/select'
import { Header } from './header'
import { Options } from './options'
import { Preview } from './preview'

type Props = z.infer<typeof QuestionSchema>

interface QuestionCardProps {
  question: QuestionDTO
  editing: {
    id: number
    set: (id: number) => void
  }
}

export function QuestionCard({ question, editing }: QuestionCardProps) {
  const { register, handleSubmit, watch, control } =
    useForm<QuestionSchemaType>({
      resolver: zodResolver(QuestionSchema),
      defaultValues: {
        ...question,
        typeId: question.questionType.id,
      },
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })
  const questionText = watch('text')
  const questionType = watch('typeId')
  const formOptions = watch('options')

  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: async () => {
      const response = await api.get('/question-types')
      return response.data as QuestionTypeDTO[]
    },
  })

  async function handleSign(data: Props) {
    console.log(data)
  }

  return (
    <Card
      onClick={() => editing.set(question.id)}
      className="group relative flex w-full min-w-[520px] max-w-xl flex-col p-5"
    >
      <Header
        index={question.index}
        text={questionText}
        typeId={questionType}
        types={questionTypes}
      />
      {editing.id === question.id && (
        <form
          onSubmit={handleSubmit(handleSign)}
          className="mt-4 flex flex-col gap-3"
        >
          <LabelDiv title="Questão" labelFor="question">
            <Input id="question" {...register('text')} />
          </LabelDiv>
          <div className="flex items-center justify-between gap-4">
            <LabelDiv
              title="Tipo de questão"
              tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
            >
              <Controller
                control={control}
                name="typeId"
                render={(type) => (
                  <Dropdown
                    setSelected={(t: any) => type.field.onChange(t)}
                    placeholder="Selecione um tipo..."
                    options={questionTypes}
                  />
                )}
              />
            </LabelDiv>
          </div>

          {/* <Preview type={questionType} options={formOptions} /> */}

          {questionType !== 'text' && (
            <Options
              fields={fields}
              register={register}
              append={append}
              remove={remove}
              control={control}
              questionType={questionType}
            />
          )}
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="secondary">Cancelar</Button>
            <Button type="submit" className="gap-2 bg-primary">
              Salvar questão <Check size={20} />
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}
