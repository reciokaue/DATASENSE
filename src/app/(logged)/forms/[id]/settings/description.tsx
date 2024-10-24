/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { updateForm } from '@/src/api/update-form'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Textarea } from '@/src/components/ui/textarea'
import { FormDTO } from '@/src/DTOs/form'
import { formSchema, formSchemaType } from '@/src/utils/schemas/form'

interface DescriptionProps {
  form: FormDTO | undefined
}

export function Description({ form }: DescriptionProps) {
  if (form === undefined)
    return (
      <>
        <Skeleton className="h-10 w-full max-w-lg" />
        <Skeleton className="h-32 w-full max-w-2xl" />
      </>
    )
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...form,
    },
  })

  const updateFormMutation = useMutation({
    mutationFn: (form: any) => updateForm(form),
    onError: (err, updatingForm) => {
      console.log(updatingForm, err)
    },
  })

  function handleCancel() {
    reset(form)
  }

  async function onSaveData({ name, about }: formSchemaType) {
    const newForm = { id: form?.id, name, about }
    await updateFormMutation.mutateAsync(newForm)
    queryClient.setQueryData(['form', String(form?.id)], {
      ...newForm,
      ...form,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSaveData)} className="space-y-4">
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
      <footer className="flex flex-row-reverse items-center justify-start gap-4">
        <Button
          type="submit"
          className="min-w-20"
          isLoading={updateFormMutation.isPending}
          isSuccess={updateFormMutation.isSuccess}
        >
          Salvar
        </Button>
        <Button onClick={handleCancel} type="button" variant="outline">
          Cancelar
        </Button>
      </footer>
    </form>
  )
}
