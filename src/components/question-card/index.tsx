'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

const questionTypes = [
  { label: 'Opções', value: 'options' },
  { label: 'Cards', value: 'cards' },
  { label: 'Emoji', value: 'emoji' },
  { label: 'Classificação', value: 'classification' },
  { label: 'Texto', value: 'text' },
]

type Props = z.infer<typeof QuestionSchema>

interface QuestionCardProps {
  question: QuestionDTO
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, watch, control } =
    useForm<QuestionSchemaType>({
      resolver: zodResolver(QuestionSchema),
      defaultValues: question as any,
    })

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'options',
  // })
  const questionText = watch('text')
  const formOptions = watch('options')
  const questionType = watch('type')

  async function handleSign(data: Props) {
    console.log(data)
  }

  return (
    <Card
      onClick={() => setIsEditing(true)}
      // onAbort={() => setIsEditing(false)}
      className="group relative flex w-full min-w-[520px] max-w-xl flex-col p-5"
    >
      <Header
        index={question.index}
        questionText={questionText}
        questionType={questionType}
      />
      {isEditing && (
        <form
          onSubmit={handleSubmit(handleSign)}
          className="mt-4 flex flex-col gap-3"
        >
          <LabelDiv title="Questão" labelFor="question">
            <Input id="question" {...register('text')} />
          </LabelDiv>
          <div className="flex items-center justify-between gap-4">
            <LabelDiv
              title="Tópicos"
              tooltip="O Tópico é relacionado a pergunta e é utilizado para mostrar e filtrar melhor o resultado das perguntas do formulário"
            >
              <Controller
                control={control}
                name="topics"
                render={(topics) => (
                  <TopicPicker
                    setTopics={(t: string[]) => {
                      topics.field.onChange(t)
                    }}
                    selectedTopics={topics.field.value || []}
                  />
                )}
              />
            </LabelDiv>
            <LabelDiv
              title="Tipo de questão"
              tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
            >
              <Controller
                control={control}
                name="type"
                render={(type) => (
                  <Dropdown
                    setSelected={(t) => {
                      type.field.onChange(t)
                    }}
                    placeholder="Selecione um tipo..."
                    options={questionTypes}
                  />
                )}
              />
            </LabelDiv>
          </div>

          {/* <Preview type={questionType} options={formOptions} /> */}

          {/* {questionType !== 'text' && (
          <Options
            fields={fields}
            register={register}
            append={append}
            remove={remove}
            control={control}
            questionType={questionType}
          />
        )} */}

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
