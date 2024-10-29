'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { getForm } from '@/src/api/get-form'
import { updateForm } from '@/src/api/update-form'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { Form, QuestionSchema } from '@/src/models'

import { EditCard } from '../components/edit-card'

interface QuestionsProps {
  formId: number
  form: Form | undefined
  questionsForm: any
}

export function Questions({ formId, form, questionsForm }: QuestionsProps) {
  const { reset, control } = questionsForm

  const { fields, append, swap } = useFieldArray({
    control,
    name: 'questions',
  })

  const updateQuestionsMutation = useMutation({
    mutationFn: (form: any) => updateForm(form),
  })

  async function handleSaveQuestions() {
    const data = questionsForm.getValues().questions
    const newForm = {
      ...form,
      questions: data,
    }
    await updateQuestionsMutation.mutateAsync(newForm)
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
      formId,
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
            isLoading={updateQuestionsMutation.isPending}
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
              <EditCard
                question={item}
                questionsForm={questionsForm}
                index={index}
              />
            </SortableItem>
          )}
        />
      )}
      {/* 
      {isLoading &&
        [0, 1, 2].map((i) => (
          <Skeleton className="mx-4 my-2 mr-10 h-40 w-full" key={i} />
        ))} */}
    </div>
  )
}
