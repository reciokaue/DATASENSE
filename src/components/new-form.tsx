import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Form, FormSchema } from '../models'
import { CategorySelector } from './category-selector'
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
          <DialogTitle>Novo formulário</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
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
          <CategorySelector setCategory={() => {}} />
        </form>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Criar Formulário</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
