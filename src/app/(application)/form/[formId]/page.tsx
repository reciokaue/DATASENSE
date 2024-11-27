/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

import { getForm } from '@/api/get-form'
import { updateQuestions } from '@/api/update-questions'
import { EditCard } from '@/components/form/edit-card'
import { FormSidebar } from '@/components/form/sidebar'
import { SortableItem } from '@/components/sortable/sortable-item'
import { SortableList } from '@/components/sortable/sortable-list'
import { Form, FormSchema } from '@/models'

export default function FormDetailPage({
  params,
}: {
  params: { formId: string }
}) {
  const { formId } = params

  const formObject = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })
  const { reset, control, setValue, watch } = formObject
  const { fields, append, swap, remove, insert } = useFieldArray({
    control,
    name: 'questions',
  }) as any

  const form = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      reset(data, { keepDirty: false })
      return data
    },
  })

  const { mutateAsync: saveForm, isPending: savingForm } = useMutation({
    mutationFn: async () => {
      const { id, questions } = formObject.getValues()
      console.log(questions)
      await updateQuestions(id, questions)
    },
    onSuccess: () => {
      reset(watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      })
    },
  })

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
  useFormPersist(`datasense@form${formId}`, {
    watch,
    setValue,
    storage: window.localStorage,
  })

  function customSwap(activeIndex: number, overIndex: number) {
    setValue(`questions.${activeIndex}.index`, overIndex)
    setValue(`questions.${overIndex}.index`, activeIndex)
    swap(activeIndex, overIndex)
  }

  return (
    <div className="relative flex items-start justify-center gap-4 pb-10">
      <div className="flex w-full max-w-3xl flex-col ">
        {form && (
          <SortableList
            items={fields}
            swap={customSwap}
            renderItem={(item, index) => (
              <SortableItem
                sortableId={item.id}
                className="relative flex items-center gap-2"
              >
                <EditCard
                  formObject={formObject}
                  index={index}
                  actions={actions}
                />
                <span
                  className="invisible absolute -top-28"
                  id={`question-${index}`}
                />
              </SortableItem>
            )}
          />
        )}
        {(form.isPending || !fields) && (
          <Loader2 className="mx-auto mt-20 size-5 animate-spin" />
        )}
        {/* {form.isPending &&
    [0, 1, 2].map((i) => (
      <Skeleton className="mx-4 my-2 mr-10 h-40 w-full" key={i} />
    ))} */}
      </div>
      <FormSidebar
        addQuestion={actions.addQuestion}
        fields={fields}
        loading={savingForm}
        save={saveForm}
        swap={customSwap}
      />
    </div>
  )
}
