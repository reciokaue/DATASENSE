/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { toast } from 'react-toastify'

import { getForm } from '@/api/get-form'
import { updateForm } from '@/api/update-form'
import { CategorySelector } from '@/components/category-selector'
import { RemoveButton } from '@/components/form/remove-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormSchema } from '@/models'

import { ExportLink } from './export-link'
import { UploadImage } from './upload-image'

export default function Config({ params }: { params: { formId: string } }) {
  const { formId } = params
  const queryClient = useQueryClient()

  const updateFormMutation = useMutation({
    mutationFn: (form: Form) => updateForm(form),
    onSuccess: (newForm: Form) => {
      const previous: Form = queryClient.getQueryData(['form', newForm.id])

      if (previous)
        queryClient.setQueryData(['form', newForm.id], {
          ...newForm,
          questions: previous.questions,
        })
      toast('Formulário salvo com sucesso', { type: 'success' })
    },
  })

  const formObject = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = formObject

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await updateFormMutation.mutateAsync({
      id: data.id,
      name: data.name,
      description: data.description,
      active: data.active,
      isPublic: data.isPublic,
      category: data.category,
    })
  }

  const form = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      reset(data)
      return data
    },
  })

  useFormPersist(`datasense@form${formId}`, {
    watch,
    setValue,
    storage: window.localStorage,
  })

  return (
    <div className="mx-auto flex  h-full max-w-3xl flex-col">
      <header className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Configurações
        </h1>
      </header>
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
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        {form && <UploadImage form={form?.data} setValue={setValue} />}
        <div className="grid grid-cols-4 gap-4">
          <CategorySelector
            control={control}
            name="category"
            error={errors?.categoryId?.message}
          />
        </div>

        <div className="relative">
          <Label>Ativo</Label>
          <p className="w-4/5 text-sm font-light leading-relaxed">
            Define se o formulário esta ativo e pode receber novas respostas,
            formulários inativos não podem receber novas respostas.
          </p>
          <Switch
            control={control}
            name="active"
            className="absolute right-5 top-1/2"
          />
        </div>
        <div className="relative ">
          <Label>Publico</Label>
          <p className="w-4/5 text-sm font-light leading-relaxed">
            Define se o formulário pode ser acessado na aba de comunidade por
            outros usuários, essa ação ajuda outros usuários com a criação de
            seus formulários e não compartilha nenhum dado sensível ou respostas
            de seu formulário.
          </p>
          <Switch
            control={control}
            name="isPublic"
            className="absolute right-5 top-1/2"
          />
        </div>
        <footer className="flex flex-col-reverse pb-10 sm:flex-row sm:justify-end sm:space-x-2">
          <RemoveButton form={form.data} />
          <ExportLink formId={formId} />
          <Button isLoading={updateFormMutation.isPending} type="submit">
            Salvar Formulário
          </Button>
        </footer>
      </form>
    </div>
  )
}
