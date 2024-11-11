'use client'

import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Loader2, Plus } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

import { SortableItem } from '@/components/sortable/sortable-item'
import { SortableList } from '@/components/sortable/sortable-list'
import { Button } from '@/components/ui/button'
import { Form } from '@/models'

import { EditCard } from '../components/edit-card'

interface QuestionsProps {
  form: UseQueryResult<Form | undefined, Error>
  formObject: any
  updateForm: UseMutationResult<AxiosResponse<any, any>, Error, any, unknown>
}

export function Questions({ form, formObject, updateForm }: QuestionsProps) {
  const { reset, control } = formObject
  const { fields, append, swap, remove, insert } = useFieldArray({
    control,
    name: 'questions',
  })

  async function handleSaveQuestions() {
    const form = formObject.getValues()
    console.log(form)
    await updateForm.mutateAsync(form)
    reset(form)
  }

  const actions = {
    removeQuestion: (index: number) => {
      remove(index)
    },
    cloneQuestion: (index: number) => {
      insert(index + 1, fields[index])
    },
    addQuestion: () => {
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
    },
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
            Salvar
          </Button>
        </div>
        <Button
          onClick={actions.addQuestion}
          variant="ghost"
          className="items-center"
        >
          Nova questão <Plus />
        </Button>
        {/* TODO Faça esse header ficar sticky */}
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
              <EditCard
                formObject={formObject}
                index={index}
                actions={actions}
              />
            </SortableItem>
          )}
        />
      )}
      {form.isPending && (
        <Loader2 className="mx-auto mt-20 size-5 animate-spin" />
      )}
      {/* {form.isPending &&
        [0, 1, 2].map((i) => (
          <Skeleton className="mx-4 my-2 mr-10 h-40 w-full" key={i} />
        ))} */}
    </div>
  )
}
