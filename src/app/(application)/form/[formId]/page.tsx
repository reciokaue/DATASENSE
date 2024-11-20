/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LayoutGrid, Loader2, Plus, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

// import useFormPersist from 'react-hook-form-persist'
import { getForm } from '@/api/get-form'
import { updateForm } from '@/api/update-form'
import { EditCard } from '@/components/form/edit-card'
import { FormSidebar } from '@/components/form/sidebar'
import { SortableItem } from '@/components/sortable/sortable-item'
import { SortableList } from '@/components/sortable/sortable-list'
import { Button } from '@/components/ui/button'
import { Form, FormSchema } from '@/models'

export default function FormDetailPage({
  params,
}: {
  params: { formId: string }
}) {
  const formObject = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })
  const { reset, control } = formObject
  const { fields, append, swap, remove, insert } = useFieldArray({
    control,
    name: 'questions',
  }) as any

  const form = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const data = await getForm(params.formId)
      reset(data)
      return data
    },
  })

  const updateFormMutation = useMutation({
    mutationFn: (form: Form) => updateForm(form),
  })
  async function handleSaveQuestions() {
    const form = formObject.getValues()
    await updateFormMutation.mutateAsync(form)
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

  // TODO Dar um jeito do persist form funcionar junto do useQuery tbm
  // ele não funciona com oq ja tem pq toda vez q salva ele da um reload e fica num ciclo infinito
  // fazer o swap dar o setValue no Sortable
  // useFormPersist(`datasense@form${params.formId}`, {
  //   watch,
  //   setValue,
  //   storage: window.localStorage,
  // })

  // TODO update the data in the react query
  // causes an inconsistency when saves and go home and return to form
  // TODO Notificação de salvo com sucesso

  useEffect(() => {
    if (form) reset(form.data)
  }, [])

  return (
    <div className="relative flex items-start justify-center gap-4 pb-10">
      <div className="flex w-full max-w-3xl flex-col ">
        {form && (
          <SortableList
            items={fields}
            swap={swap}
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
        {form.isPending && (
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
        loading={updateFormMutation.isPending}
        save={handleSaveQuestions}
        swap={swap}
      />
    </div>
  )
}
