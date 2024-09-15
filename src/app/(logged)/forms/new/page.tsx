/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BookCopy, ChevronLeft, Hand, Plus, ScanSearch } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { input } from 'zod'

import { createNewForm } from '@/src/api/create-new-form'
import { TopicPicker } from '@/src/components/topic-picker'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { TagList } from '@/src/components/ui/tag-list'
import { Textarea } from '@/src/components/ui/textarea'
import { TopicDTO } from '@/src/DTOs/topic'
import { createFormSchema } from '@/src/utils/schemas/form'

const options = [
  { title: 'Começar do zero', Icon: Hand, type: 'from-zero' },
  { title: 'Importar perguntas', Icon: ScanSearch, type: 'import-questions' },
  { title: 'Começar com modelo', Icon: BookCopy, type: 'models' },
]
export type formSchemaType = input<typeof createFormSchema>

export default function NewForm() {
  const [startType, setStartType] = useState('from-zero')
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(createFormSchema),
  })
  const topics = watch('topics')
  const router = useRouter()

  const newFormMutation = useMutation({
    mutationFn: (form: any) => createNewForm(form),
    onError: (err, newQuestion) => {
      console.log(newQuestion, err)
    },
  })

  async function handleCreateForm(data: formSchemaType) {
    if (topics.length === 0) return
    const newForm = await newFormMutation.mutateAsync(data)

    if (startType === 'from-zero') router.push(`/forms/${newForm.id}`)
    if (startType === 'import-questions')
      router.push(`/forms/${newForm.id}/import-questions`)
    if (startType === 'models') router.push(`/forms/${newForm.id}/models`)
  }

  const onSelectType = (event: any, type: string) => {
    event.preventDefault()
    setStartType(type)
  }

  return (
    <div className="flex flex-col">
      <nav>
        <Link href="/forms">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
      </nav>
      <main className="mx-auto flex w-full max-w-[500px] flex-col">
        <form
          onSubmit={handleSubmit(handleCreateForm)}
          className="flex flex-col space-y-6"
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

          <div>
            <Input
              type="text"
              id="name"
              placeholder="Nome"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Textarea
              className="h-32 resize-none"
              id="about"
              placeholder="Fale sobre o foco do formulário"
              {...register('about')}
            />
            {errors.about && (
              <p className="mt-1 text-sm text-red-500">
                {errors.about.message}
              </p>
            )}
          </div>

          <Controller
            name="topics"
            control={control}
            render={({ field }: any) => (
              <TopicPicker
                setSelectedTopics={(t: TopicDTO[]) => {
                  field.onChange(t)
                }}
                selectedTopics={field.value || []}
              />
            )}
          />
          {errors.topics && (
            <p className="mt-1 text-sm text-red-500">{errors.topics.message}</p>
          )}

          <div className="grid grid-cols-3 gap-3">
            {options.map(({ title, Icon, type }, index) => (
              <button
                value={type}
                key={index}
                className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-md border border-input bg-transparent p-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-selected:bg-primary/5"
                onClick={(e) => onSelectType(e, type)}
                aria-selected={startType === type}
              >
                <Icon className="h-6 w-6" color="#222" />
                <h1 className="w-2/3 font-semibold">{title}</h1>
              </button>
            ))}
          </div>

          <footer className="flex items-center justify-end gap-3">
            <Link href="/forms">
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button type="submit">Continuar</Button>
          </footer>
        </form>
      </main>
    </div>
  )
}
