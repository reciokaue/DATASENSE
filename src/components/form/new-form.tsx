import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { GetFormsData } from '@/api/get-forms'

import { createNewForm } from '../../api/create-new-form'
import { FormSchema } from '../../models'
import { CategorySelector } from '../category-selector'
import { TemplateSelector } from '../template-selector'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const CreateFormSchema = FormSchema.pick({
  name: true,
  description: true,
  categoryId: true,
}).extend({
  categoryId: z.number({ required_error: 'Campo obrigatório' }),
  templateId: z.number().nullable().optional().default(null),
})
type CreateForm = z.infer<typeof CreateFormSchema>

export function NewFormButton() {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateForm>({
    resolver: zodResolver(CreateFormSchema),
  })
  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
    mutateAsync(data)
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateForm) => {
      return await createNewForm(data, data.templateId)
    },
    onSuccess: (newForm) => {
      const previous: GetFormsData = queryClient.getQueryData(['user-forms'])

      queryClient.setQueryData(['user-forms'], {
        meta: {
          ...previous.meta,
          totalCount: previous.meta.totalCount + 1,
        },
        forms: [...previous.forms, newForm],
      })

      push(`/form/${newForm.id}`)
    },
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Nome *
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Nome"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
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
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <CategorySelector
              control={control}
              name="categoryId"
              error={errors?.categoryId?.message}
            />
            <TemplateSelector name="templateId" control={control} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button isLoading={isPending} type="submit">
              Criar Formulário
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}