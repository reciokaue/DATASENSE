'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BookCopy, ChevronLeft, Hand, Plus, ScanSearch } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TopicPicker } from '@/src/components/topic-picker'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { LabelDiv } from '@/src/components/ui/label-div'
import { TagList } from '@/src/components/ui/tag-list'
import { Textarea } from '@/src/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group'
import { FormSchema } from '@/src/schemas/form'

const options = [
  { title: 'Começar do zero', Icon: Hand, type: 'from-zero' },
  { title: 'Importar perguntas', Icon: ScanSearch, type: 'import-questions' },
  { title: 'Começar com modelo', Icon: BookCopy, type: 'with-model' },
]

export default function NewForm() {
  const [startType, setStartType] = useState('from-zero')
  const { register, handleSubmit, control, watch } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
  })
  const topics = watch('topics')

  function createNewForm(data: FormSchema) {
    console.log(data, startType)
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
              <></>
              // <TopicPicker
              //   setTopics={(t: string[]) => {
              //     topics.field.onChange(t)
              //   }}
              //   selectedTopics={topics.field.value || []}
              // />
            )}
          />
          <ToggleGroup type="single">
            {options.map(({ title, Icon, type }, index) => (
              <ToggleGroupItem
                value={title}
                key={index}
                variant="outline"
                className="flex h-32 w-full flex-col gap-2"
                onClick={() => setStartType(type)}
              >
                <Icon className="h-6 w-6" color="#222" />
                <h1>{title}</h1>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

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
