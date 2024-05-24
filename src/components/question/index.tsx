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

import { useQuestionType } from '@/src/contexts/questionType'
import { QuestionDTO } from '@/src/DTOs/question'

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
    defaultValues: {
      ...question,
      typeId: question.questionType.id,
    } as any,
  })

  const { questionTypesById } = useQuestionType()
  const { register, handleSubmit, watch, control } = questionForm

  const questionText = watch('text')
  const questionTypeId = watch('typeId')
  const selectedQuestionType =
    questionTypesById && questionTypesById[questionTypeId]

  async function handleSign(data: questionSchemaType) {
    console.log(data)
  }

  return (
    <Card
      onClick={() => editing.set(question.id)}
      className="group relative flex w-full min-w-[520px] max-w-xl flex-col p-5"
    >
      <header className="flex flex-1 gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {question.index}
        </span>
        <p className="w-full break-words text-left text-lg font-medium leading-relaxed text-neutral-700">
          {questionText}
        </p>
        {selectedQuestionType ? (
          <label className="flex gap-2 text-sm text-muted-foreground">
            {selectedQuestionType.label}
            <Icon name={selectedQuestionType.icon} />
          </label>
        ) : null}
      </header>
      {editing.id === question.id && (
        <form
          onSubmit={handleSubmit(handleSign, console.log)}
          className="mt-4 flex flex-col gap-3"
        >
          <LabelDiv title="Questão" labelFor="question">
            <Input id="question" {...register('text')} />
          </LabelDiv>
          <SelectQuestionType control={control} />

          {/* <Preview type={questionType} options={formOptions} /> */}

          <Options useForm={questionForm} />

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
