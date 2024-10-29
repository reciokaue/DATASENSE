'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getForm } from '@/src/api/get-form'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'
import { QuestionSchema } from '@/src/models'

import { Config } from './screens/config'
import { Questions } from './screens/questions'
import { Responses } from './screens/responses'

const QuestionsSchema = z.object({
  questions: z.array(QuestionSchema),
})
export type QuestionsArray = z.input<typeof QuestionsSchema>

export default function FormDetailPage({
  params,
}: {
  params: { formId: string }
}) {
  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const data = await getForm(params.formId)
      reset({ questions: data?.questions || [] })
      return data
    },
  })
  const questionsForm = useForm<QuestionsArray>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: { questions: form?.questions || [] },
  })
  const { reset } = questionsForm

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
            formId={+params.formId}
            form={form}
            questionsForm={questionsForm}
          />
        </TabsContent>
        <TabsContent value="responses">
          <Responses />
        </TabsContent>
        <TabsContent value="config">
          <Config />
        </TabsContent>
      </Tabs>
    </>
  )
}
