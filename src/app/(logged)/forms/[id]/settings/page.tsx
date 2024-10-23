'use client'

import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'

import { getForm } from '@/src/api/get-form'
import { TopicPicker } from '@/src/components/topic-picker'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator'
import { Switch } from '@/src/components/ui/switch'
import { TagList } from '@/src/components/ui/tag-list'

import { Description } from './description'
import ImagePicker from './image-picker'

export default function SettingsPage({ params }: { params: { id: string } }) {
  const { data: form } = useQuery({
    queryKey: ['form', params.id],
    queryFn: () => getForm(params.id),
  })

  return (
    <div className="flex h-full flex-col pb-10">
      <h1 className="text-2xl font-medium">Configurações {form?.name}</h1>
      <Separator />
      <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Descrição</h2>
        <Description form={form} />
      </section>
      <Separator />
      <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Tópicos</h2>
        <TagList
          className="max-w-full"
          tags={form?.topics || []}
          loading={!form?.topics}
          loadingSize={10}
          variant="default"
          icon="no-icon"
          onTagClick={() => {}}
        />

        <TopicPicker
          setSelectedTopics={() => {}}
          selectedTopics={[]}
          onClose={() => {}}
          triggerProps={{
            variant: 'outline',
            className: 'w-fit',
          }}
        />
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
        <div className="relative">
          <label className="text-lg font-normal">Ativo</label>
          <p className="w-4/5 text-sm font-light leading-relaxed">
            Define se o formulário esta ativo e pode receber novas respostas,
            formulários inativos não podem receber novas respostas.
          </p>
          <Switch className="absolute right-5 top-1/2" />
        </div>
        <div className="relative ">
          <label className="text-lg font-normal">Publico</label>
          <p className="w-4/5 text-sm font-light leading-relaxed">
            Define se o formulário pode ser acessado na aba de comunidade por
            outros usuários, essa ação ajuda outros usuários com a criação de
            seus formulários e não compartilha nenhum dado sensível ou respostas
            de seu formulário.
          </p>
          <Switch className="absolute right-5 top-1/2" />
        </div>
      </section>

      {/* <section className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Tópicos</h2>
       
      </section> */}
    </div>
  )
}
