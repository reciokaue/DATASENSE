'use client'

import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Plus } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Form } from '@/src/models'

import { EditCard } from '../components/edit-card'

interface QuestionsProps {
  form: UseQueryResult<Form | undefined, Error>
  formObject: any
  updateForm: UseMutationResult<AxiosResponse<any, any>, Error, any, unknown>
}

export function Questions({ form, formObject, updateForm }: QuestionsProps) {
  const { reset, control } = formObject
  const { fields, append, swap } = useFieldArray({
    control,
    name: 'questions',
  })

  async function handleSaveQuestions() {
    const data = formObject.getValues().questions
    const newForm = {
      ...form.data,
      questions: data,
    }
    console.log(newForm)
    await updateForm.mutateAsync(newForm)
    reset({ questions: data })
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
      formId: form.data?.id,
      id: -Math.round(Math.random() * 100),
    })
  }

  return (
    <div className="relative flex flex-col pb-10">
      <header className="mb-6 mr-8 flex items-center justify-between px-6 ">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSaveQuestions}
            variant="outline"
            className="bg-white text-black"
            isLoading={updateForm.isPending}
          >
            {' '}
            Salvar
          </Button>
        </div>
        <Button
          onClick={handleAddQuestion}
          variant="ghost"
          className="items-center"
        >
          Nova questão <Plus />
        </Button>
      </header>

      {form && (
        <SortableList
          items={fields}
          swap={swap}
          renderItem={(item, index) => (
            <SortableItem
              sortableId={item.id}
              className="flex items-center gap-2"
            >
              <EditCard question={item} formObject={formObject} index={index} />
            </SortableItem>
          )}
        />
      )}

      {form.isPending &&
        [0, 1, 2].map((i) => (
          <Skeleton className="mx-4 my-2 mr-10 h-40 w-full" key={i} />
        ))}
    </div>
  )
}
