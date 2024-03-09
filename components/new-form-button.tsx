'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { BookCopy, Hand, Plus, ScanSearch } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/api'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Combobox } from './ui/combobox'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

const topics = [
  { label: 'Satisfação do Cliente', value: 'Teste' },
  { label: 'Experiência do Usuário (UX)', value: 'Teste' },
  { label: 'Produtos e Serviços', value: 'Teste' },
  { label: 'Mercado e Tendências', value: 'Teste' },
  { label: 'Atendimento ao Cliente', value: 'Teste' },
  { label: 'Opinião Pública', value: 'Teste' },
  { label: 'Preços e Valor', value: 'Teste' },
  { label: 'Marketing e Publicidade', value: 'Teste' },
]

const options = [
  { title: 'Começar do zero', Icon: Hand, type: 'from-zero' },
  { title: 'Importar perguntas', Icon: ScanSearch, type: 'import-questions' },
  { title: 'Começar com modelo', Icon: BookCopy, type: 'with-model' },
]

const schema = z.object({
  name: z.string(),
  topic: z.string(),
  about: z.string(),
  startType: z.string(),
})
type Props = z.infer<typeof schema>

export function NewFormButton() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<Props>({
    resolver: zodResolver(schema),
  })

  async function handleCreateNewForm(data: Props) {
    const token = getCookie('@feedback.view:auth-token')

    if (data.startType === 'from-zero') {
      try {
        const response = await api.post('/form', {
          name: data.name,
          about: data.about,
          topic: data.topic,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        // const response = await api.post('/login', {
        //   email: data.email,
        //   password: data.password,
        // })
      } catch (e) {
        console.log(e)
      }

      // console.log(response.data)
      // router.push(`/form/${response.data.id}`)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="gap-2">
          New
          <Plus className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2 flex flex-row items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo formulário
          </AlertDialogTitle>
          <form
            onSubmit={handleSubmit(handleCreateNewForm)}
            className="flex flex-col gap-2 space-y-2"
          >
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Nome
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Nome"
              {...register('name')}
            />
            <label className="text-sm font-medium leading-none">Tópico</label>
            <Controller
              control={control}
              name="topic"
              render={(topic) => (
                <Combobox
                  handleSetValue={(topicValue) =>
                    topic.field.onChange(topicValue)
                  }
                  title="Selecione um tópico"
                  frameworks={topics}
                />
              )}
            ></Controller>
            <article className="flex items-center justify-center gap-4">
              <Controller
                control={control}
                name="startType"
                render={(startType) => (
                  <ToggleGroup type="single">
                    {options.map(({ title, Icon, type }, index) => (
                      <ToggleGroupItem
                        value={title}
                        key={index}
                        variant="outline"
                        className="flex h-32 w-full flex-col gap-2"
                        onClick={() => startType.field.onChange(type)}
                      >
                        <Icon className="h-6 w-6" color="#222" />
                        <h1>{title}</h1>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
              ></Controller>
            </article>
            <label className="text-sm font-medium leading-none" htmlFor="about">
              Sobre
            </label>
            <Textarea
              className="h-32 resize-none"
              id="about"
              placeholder="Fale sobre o foco do formulário"
              {...register('about')}
            />
            <AlertDialogDescription className="pb-10">
              Este texto não sera visível para quem responder o formulário.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button disabled={isSubmitting} type="submit">
                Continuar
              </Button>
              {/* <AlertDialogAction disabled={isSubmitting} type="submit">
                Continuar
              </AlertDialogAction> */}
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
