'use client'

import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'

import { getForm } from '@/src/api/get-form'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator'

import { Defaults } from './defaults'
import { Description } from './description'
import ImagePicker from './image-picker'
import { Topics } from './topics'

export default function SettingsPage({ params }: { params: { id: string } }) {
  const { data: form } = useQuery({
    queryKey: ['form', params.id],
    queryFn: () => getForm(params.id),
  })

  return (
    <div className="flex h-full flex-col pb-10">
      <h1 className="text-2xl font-medium">Configurações</h1>
      <Separator />
      <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Descrição</h2>
        <Description form={form} />
      </section>
      <Separator />
      <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Tópicos</h2>
        <Topics form={form} />
      </section>
      <Separator />
      <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Banner</h2>
        <ImagePicker />
        <Button className="ml-auto w-fit" variant="outline">
          Visualizar <Eye />
        </Button>
      </section>
      <Separator />
      <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Padrões</h2>
        <Defaults form={form} />
      </section>

      {/* <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Tópicos</h2>
       
      </section> */}
    </div>
  )
}
