'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getForm } from '@/src/api/get-form'

import { Config } from './pages/config'
import { Questions } from './pages/questions'
import { Responses } from './pages/responses'

export default function FormAnalyticsPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: form } = useQuery({
    queryKey: ['form', params.id],
    queryFn: () => getForm(params.id),
  })

  return (
    <div className="flex h-full w-full flex-col gap-3 p-6">
      <Tabs defaultValue="account" className="">
        <TabsList className="mx-auto">
          <TabsTrigger value="questions">Perguntas</TabsTrigger>
          <TabsTrigger value="responses">Respostas</TabsTrigger>
          <TabsTrigger value="config">Configurações</TabsTrigger>
        </TabsList>
        {JSON.stringify(form?.name)}

        {!form ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <>
            <TabsContent value="config">
              <Config form={form} />
            </TabsContent>
            <TabsContent value="questions">
              <Questions form={form} />
            </TabsContent>
            <TabsContent value="responses">
              <Responses form={form} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
