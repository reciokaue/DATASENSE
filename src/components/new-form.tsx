import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Form, FormSchema } from '../models'
import { CategorySelector } from './category-selector'
import { CopyFormSelector } from './copy-form-selector'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export function NewFormButton() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Novo <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Novo formulário</DialogTitle>
          <DialogDescription>
            Aqui você pode criar um novo formulário. Preencha os campos abaixo e
            clique em &quot;Criar Formulário&quot; quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4 grid gap-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
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
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Descrição
            </Label>
            <Textarea
              className="h-32 resize-none"
              id="description"
              placeholder="Fale sobre o foco do formulário"
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <CategorySelector setCategory={() => {}} />
            <CopyFormSelector setCopyForm={() => {}} />
          </div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Criar Formulário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
