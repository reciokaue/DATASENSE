'use client'

import { BookCopy, Hand, Plus, ScanSearch } from 'lucide-react'
import Link from 'next/link'

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
// import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

const topics = [
  { label: 'Satisfação do Cliente', value: '1' },
  { label: 'Experiência do Usuário (UX)', value: '2' },
  { label: 'Produtos e Serviços', value: '3' },
  { label: 'Mercado e Tendências', value: '4' },
  { label: 'Atendimento ao Cliente', value: '5' },
  { label: 'Opinião Pública', value: '6' },
  { label: 'Preços e Valor', value: '7' },
  { label: 'Marketing e Publicidade', value: '89' },
]

const options = [
  { title: 'Começar do zero', Icon: Hand },
  { title: 'Importar perguntas', Icon: ScanSearch },
  { title: 'Começar com modelo', Icon: BookCopy },
]

export function NewFormButton() {
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
          <form className="flex flex-col gap-2 space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Nome
            </label>
            <Input type="text" id="name" placeholder="Nome" />
            <label className="text-sm font-medium leading-none">Tópico</label>
            <Combobox title="Selecione um tópico" frameworks={topics} />
            <article className="flex items-center justify-center gap-4">
              <ToggleGroup type="single">
                {options.map(({ title, Icon }, index) => (
                  <ToggleGroupItem
                    value={title}
                    key={index}
                    variant="outline"
                    className="flex h-32 w-full flex-col gap-2"
                  >
                    <Icon className="h-6 w-6" color="#222" />
                    <h1>{title}</h1>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </article>
            <label className="text-sm font-medium leading-none" htmlFor="about">
              Sobre
            </label>
            <Textarea
              className="h-32 resize-none"
              id="about"
              placeholder="Fale sobre o foco do formulário"
            />
            <AlertDialogDescription className="pb-10">
              Este texto não sera visível para quem responder o formulário.
            </AlertDialogDescription>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Link href="/form">
            <AlertDialogAction>Continuar</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
