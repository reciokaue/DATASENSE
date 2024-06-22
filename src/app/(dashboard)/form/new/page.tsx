/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BookCopy, ChevronLeft, Hand, Plus, ScanSearch } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { input } from 'zod'

import { TopicPicker } from '@/src/components/topic-picker'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { LabelDiv } from '@/src/components/ui/label-div'
import { TagList } from '@/src/components/ui/tag-list'
import { Textarea } from '@/src/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group'
import { TopicDTO } from '@/src/DTOs/topic'
import { api } from '@/src/lib/api'
import { createFormSchema } from '@/src/schemas/form'

const options = [
  { title: 'Começar do zero', Icon: Hand, type: 'from-zero' },
  { title: 'Importar perguntas', Icon: ScanSearch, type: 'import-questions' },
  { title: 'Começar com modelo', Icon: BookCopy, type: 'with-model' },
]
export type formSchemaType = input<typeof createFormSchema>

export default function NewForm() {
  const [startType, setStartType] = useState('from-zero')
  const { register, handleSubmit, control, watch } = useForm<formSchemaType>({
    resolver: zodResolver(createFormSchema),
  })
  const topics = watch('topics')
  const router = useRouter()

  async function createNewForm(data: formSchemaType) {
    console.log(data, startType)
    const formData = {
      name: data.name,
      about: data.about,
      topics: data.topics ? data.topics.map((topic) => topic.id) : [],
    }

    if (startType === options[1].type) {
      router.push(
        '/form/new/importing' +
          `?name=${formData.name}` +
          `&about=${formData.about}` +
          `&topics=${formData.topics}`,
      )
    }
    if (startType === options[2].type) {
      router.push(
        '/form/new/models' +
          `?name=${formData.name}` +
          `&about=${formData.about}` +
          `&topics=${formData.topics}`,
      )
    }
    if (startType === options[0].type) {
      const response = await api.post('/form', {
        ...formData,
        active: true,
        isPublic: false,
      })
      router.push(`/form/${response.data.id}/edit`)
    }
  }
  const onSelectType = (event: any, type: string) => {
    event.preventDefault()
    setStartType(type)
  }

  return (
    <div className="flex flex-col">
      <nav>
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
      </nav>
      <main className="mx-auto flex w-full max-w-[500px] flex-col">
        <form
          onSubmit={handleSubmit(createNewForm)}
          className="flex flex-col space-y-4"
        >
          {topics && (
            <TagList
              className="max-w-full"
              tags={topics}
              variant="default"
              icon="no-icon"
              onTagClick={() => {}}
            />
          )}
          <h1 className="flex items-center gap-2 text-xl font-bold leading-relaxed">
            <Plus /> Novo formulário
          </h1>

          <LabelDiv title="Nome">
            <Input
              type="text"
              id="name"
              placeholder="Nome"
              {...register('name')}
            />
          </LabelDiv>
          <LabelDiv
            title="Tópicos"
            tooltip="O Tópico é relacionado a pergunta e é utilizado para mostrar e filtrar melhor o resultado das perguntas do formulário"
            name="topics"
            control={control}
            render={(topics) => (
              <TopicPicker
                setTopics={(t: TopicDTO[]) => {
                  topics.field.onChange(t)
                }}
                selectedTopics={topics.field.value || []}
              />
            )}
          />
          <div className="grid grid-cols-3 gap-3">
            {options.map(({ title, Icon, type }, index) => (
              <button
                value={type}
                key={index}
                className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-md border border-input bg-transparent p-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-selected:bg-accent"
                onClick={(e) => onSelectType(e, type)}
                aria-selected={startType === type}
              >
                <Icon className="h-6 w-6" color="#222" />
                <h1 className="w-2/3 font-semibold">{title}</h1>
              </button>
            ))}
          </div>

          <LabelDiv title="Sobre">
            <Textarea
              className="h-32 resize-none"
              id="about"
              placeholder="Fale sobre o foco do formulário"
              {...register('about')}
            />
          </LabelDiv>
          <footer className="flex items-center justify-end gap-3">
            <Button variant="secondary">Cancelar</Button>
            <Button type="submit">Continuar</Button>
          </footer>
        </form>
      </main>
    </div>
  )
}
