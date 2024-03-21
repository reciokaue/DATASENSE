'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import {
  Controller,
  useFieldArray,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import { z } from 'zod'

import { QuestionSchema } from '../../utils/schemas/form'
import { TopicPicker } from '../topic-picker'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Combobox } from '../ui/combobox'
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
  item: { id: number }
  form: UseFormProps | any
}

export function QuestionCard({ item, form }: QuestionCardProps) {
  const { register, handleSubmit, control, watch } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })
  const questionText = watch('text')
  const formOptions = watch('options')
  const questionType = watch('type')

  async function handleSign(data: Props) {
    console.log(data)
  }

  return (
    <Card className="group relative flex w-full min-w-[520px] max-w-xl flex-col px-6 py-8">
      <Header
        index={1}
        questionText={questionText}
        questionType={questionType}
      />
      <form
        onSubmit={handleSubmit(handleSign)}
        className="mt-8 flex flex-col gap-4"
      >
        <LabelDiv title="Questão" labelFor="question">
          <Input id="question" {...register('text')} />
        </LabelDiv>
        <div className="flex items-center justify-between gap-4">
          <LabelDiv
            title="Tópico"
            tooltip="O Tópico é relacionado a pergunta e é utilizado para mostrar e filtrar melhor o resultado das perguntas do formulário"
          >
            {/* <TopicPicker setTopic={() => {}} /> */}
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

        <Preview type={questionType} options={formOptions} />

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
    </Card>
  )
}

const options_example = [
  {
    id: 'df9c2577-926c-4d85-a6ef-c821d5a138f8',
    text: 'Menos de 18 anos',
    value: 1,
    questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  },
  {
    id: '48c7ac98-5911-42f9-a2a8-bbd88f983852',
    text: '18-24 anos',
    value: 2,
    questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  },
  {
    id: 'f688304c-21a0-476f-ae33-646b062e70a6',
    text: '25-34 anos',
    value: 3,
    questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  },
  {
    id: '4b36087a-5f91-4f59-85c1-41e52e8e8e0f',
    text: '35-44 anos',
    value: 4,
    questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  },
  // {
  //   id: '1694d2d8-2a52-428a-a10e-ab512f8218c6',
  //   text: '45-54 anos',
  //   value: 5,
  //   questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  // },
  // {
  //   id: '42803f69-4c0c-4e9c-8b6d-9ee1359aaf4e',
  //   text: '55-64 anos',
  //   value: 6,
  //   questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  // },
  // {
  //   id: '3fc2282c-1ff8-4e8e-b383-3dea7fa139c6',
  //   text: '65 anos ou mais',
  //   value: 7,
  //   questionId: 'fd559d3c-658d-4993-8e6d-67a29d6f6090',
  // },
]
