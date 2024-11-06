/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// import useFormPersist from 'react-hook-form-persist'
import { getForm } from '@/src/api/get-form'
import { updateForm } from '@/src/api/update-form'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'
import { Form, FormSchema } from '@/src/models'

import { Config } from './screens/config'
import { Questions } from './screens/questions'
import { Responses } from './screens/responses'

export default function FormDetailPage({
  params,
}: {
  params: { formId: string }
}) {
  const formObject = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })
  const { reset } = formObject

  const form = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const data = await getForm(params.formId)
      console.log(data)
      reset(data)
      return data
    },
    refetchInterval: 1000 * 60 * 60 * 24, // 1 day
  })
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

  const updateFormMutation = useMutation({
    mutationFn: (form: Form) => updateForm(form),
  })

  useEffect(() => {
    if (form) reset(form.data)
  }, [])

  return (
    <>
      <Tabs defaultValue="questions" className="flex w-full flex-col">
        <TabsList className="mx-auto">
          <TabsTrigger value="questions">Questões</TabsTrigger>
          <TabsTrigger value="responses">Respostas</TabsTrigger>
          <TabsTrigger value="config">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <Questions
            form={form}
            formObject={formObject}
            updateForm={updateFormMutation}
          />
        </TabsContent>
        <TabsContent value="responses">
          <Responses />
        </TabsContent>
        <TabsContent value="config">
          <Config
            form={form}
            formObject={formObject}
            updateForm={updateFormMutation}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
