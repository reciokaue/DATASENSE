'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Plus, SaveAll } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

import { getForm } from '@/src/api/get-form'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'
import {
  questionSchemaArray,
  questionSchemaArrayType,
} from '@/src/utils/schemas/question'

import { Card } from './card'

const form = {
  id: 1,
  name: 'Exemplo de Formulário',
  about: 'Este é um exemplo de formulário.',
  active: true,
  logoUrl: 'https://example.com/logo.png',
  isPublic: false,
  createdAt: '2024-05-17T19:22:44.581Z',
  _count: { questions: 1, sessions: 0 },
  questions: [
    {
      id: 3,
      text: 'Pergunta teste',
      index: 0,
      questionType: {
        id: 1,
        name: 'options',
        label: 'Opções',
        icon: 'CircleDot',
      },
      required: true,
      formId: 1,
      options: [
        { id: 2, index: 2, text: '5' },
        { id: 3, index: 3, text: '8' },
        { id: 1, index: 1, text: 'editada' },
      ],
      _count: { responses: 0 },
    },
  ],
  topics: [
    { id: 1, name: 'satisfação' },
    { id: 2, name: 'cliente' },
    { id: 3, name: 'avaliação' },
    { id: 4, name: 'produto' },
    { id: 5, name: 'experiência' },
    { id: 6, name: 'usuário' },
    { id: 7, name: 'sugestões' },
  ],
}

export default function Page({ params }: { params: { id: string } }) {
  const formId = +params.id

  // const { data: form, isLoading } = useQuery({
  //   queryKey: ['form', formId],
  //   queryFn: async () => {
  //     const data = await getForm(formId)
  //     questionsForm.reset({ questions: data?.questions || [] })
  //     return data
  //   },
  // })

  const questionsForm = useForm<questionSchemaArrayType>({
    resolver: zodResolver(questionSchemaArray),
    defaultValues: { questions: form?.questions || [] },
  })

  const { fields, append, swap } = useFieldArray({
    control: questionsForm.control,
    name: 'questions',
  })

  function logData() {
    console.log(questionsForm.getValues())
  }

  function handleAddQuestion() {
    append({
      text: '',
      questionType: {
        id: 1,
        name: 'options',
        label: 'Opções',
        icon: 'CircleDot',
      },
      required: false,
      options: [],
      index: fields.length,
      formId,
      id: -Math.round(Math.random() * 100),
    })
  }

  return (
    <div className="relative flex flex-col pb-10">
      <header className="mb-6 mr-8 flex items-center justify-between ">
        <Button onClick={logData} variant="outline" className="items-center">
          <SaveAll />
          Salvar
        </Button>
        <Button
          onClick={handleAddQuestion}
          variant="ghost"
          className="items-center"
        >
          Nova questão <Plus />
        </Button>
      </header>

      {fields ? (
        <SortableList
          items={fields}
          swap={swap}
          renderItem={(item, index) => (
            <SortableItem
              sortableId={item.id}
              className="flex items-center gap-2"
            >
              <Card
                question={item}
                formId={+params.id}
                questionsForm={questionsForm}
                index={index}
              />
            </SortableItem>
          )}
        />
      ) : (
        [0, 1, 2].map((i) => (
          <Skeleton className="mx-4 my-2 mr-10 h-40 w-full" key={i} />
        ))
      )}
    </div>
  )
}
