'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

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
  })

  const updateFormMutation = useMutation({
    mutationFn: (form: Form) => updateForm(form),
  })

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
