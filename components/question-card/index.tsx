'use client'

import { Check, CircleDot, GripVertical, SmilePlus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Combobox } from '../ui/combobox'
import { Input } from '../ui/input'
import { LabelDiv } from '../ui/label-div'
import { Preview } from './preview'

interface QuestionCardProps {
  item: { id: number }
}

const questionTypes = [
  { label: 'Opções', value: 'options' },
  { label: 'Cards', value: 'cards' },
  { label: 'Emoji', value: 'emoji' },
  { label: 'Classificação', value: 'classification' },
  { label: 'Texto', value: 'text' },
]

export function QuestionCard({ item }: QuestionCardProps) {
  const [questionType, setQuestionType] = useState('options')

  return (
    <Card className="group relative flex w-full max-w-xl flex-col px-6 py-8">
      <header className="mb-4 flex items-center justify-between">
        <label className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          <SmilePlus size={20} /> 1
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          Múltipla escolha <CircleDot size={20} />
        </label>
      </header>
      <div className="flex flex-1 gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          1
        </span>
        <p className="w-full text-lg font-medium leading-relaxed text-neutral-700">
          Como você classificaria nosso atendimento ao cliente?
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-4">
        <LabelDiv title="Questão" labelFor="question">
          <Input value={''} id="question" />
        </LabelDiv>
        <div className="flex items-center justify-between gap-4">
          <LabelDiv
            title="Tópico"
            tooltip="O Tópico é relacionado a pergunta e é utilizado para mostrar e filtrar melhor o resultado das perguntas do formulário"
          >
            <Combobox
              defaultValue="options"
              title="Selecione um tópico..."
              frameworks={[]}
            />
          </LabelDiv>
          <LabelDiv
            title="Tipo de questão"
            tooltip="O tipo da pergunta é muito importante para se ter o resultado desejado da melhor maneira possível"
          >
            <Combobox
              defaultValue="options"
              handleSetValue={setQuestionType}
              title="Selecione um tipo..."
              frameworks={questionTypes}
            />
          </LabelDiv>
        </div>

        <Preview type={questionType} options={options_example} />

        <LabelDiv title="Escolhas" styles="space-y-3 pr-8">
          {['Sim', 'Não', 'Talvez'].map((option) => (
            <li
              key={option}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Button variant="link" className="hover:text-red-500">
                <Trash2 />
              </Button>
              <Input value={option} placeholder="Option text" styles="flex-1" />
              <GripVertical size={18} />
            </li>
          ))}
        </LabelDiv>
        {/* <LabelDiv
            title="Additional options"
          >
            required questions: booleans
            allow comments: booleans
          </LabelDiv> */}
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="secondary">Cancelar</Button>
          <Button className="gap-2 bg-primary">
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
