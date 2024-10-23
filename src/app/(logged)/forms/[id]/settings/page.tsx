'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { getForm } from '@/src/api/get-form'
import { TopicPicker } from '@/src/components/topic-picker'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { Switch } from '@/src/components/ui/switch'
import { TagList } from '@/src/components/ui/tag-list'
import { Textarea } from '@/src/components/ui/textarea'
import { TopicDTO } from '@/src/DTOs/topic'
import { formSchema, formSchemaType } from '@/src/utils/schemas/form'

import ImagePicker from './image-picker'

export default function SettingsPage({ params }: { params: { id: string } }) {
  const formId = +params.id

  const { data: form, isLoading } = useQuery({
    queryKey: ['form', params.id],
    queryFn: async () => {
      const data = await getForm(formId)
      reset(form)
      return data
    },
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  })

  return (
    <div className="flex h-full flex-col pb-10">
      <h1 className="text-2xl font-medium">Configurações</h1>
      <Separator />
      <form className="flex flex-col space-y-4 p-3">
        <h2 className="text-xl font-normal">Descrição</h2>
        <div>
          <Input
            type="text"
            id="name"
            placeholder="Nome"
            className="max-w-lg"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Textarea
            className="h-32 max-w-2xl resize-none"
            id="about"
            placeholder="Fale sobre o foco do formulário"
            {...register('about')}
          />
          {errors.about && (
            <p className="mt-1 text-sm text-red-500">{errors.about.message}</p>
          )}
        </div>
      </form>
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
