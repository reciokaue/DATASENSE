/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { getForm } from '@/api/get-form'
import { updateForm } from '@/api/update-form'
import { CategorySelector } from '@/components/category-selector'
import { ExportLink } from '@/components/export-link'
import { RemoveButton } from '@/components/form/remove-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormSchema } from '@/models'

export default function Config({ params }: { params: { formId: string } }) {
  const { formId } = params

  const updateFormMutation = useMutation({
    mutationFn: (form: Form) => updateForm(form),
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
    formState: { errors },
  } = formObject

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const newForm = await updateFormMutation.mutateAsync(data)
    console.log(newForm)
  }

  const category = watch('category')

  const form = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      console.log(data)
      reset(data)
      return data
    },
  })

  function resetForm() {
    reset(form.data)
  }

  return (
    <div className="mx-auto flex  h-full max-w-3xl flex-col overflow-x-hidden pb-10">
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
        <div className="flex items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Upload />
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <CategorySelector
            control={control}
            name="categoryId"
            category={category}
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
        <footer className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <RemoveButton form={form.data} />
          <ExportLink />
          {/* <Button
            onClick={resetForm}
            variant="outline"
            disabled={updateFormMutation.isPending}
          >
            Cancelar
          </Button> */}
          <Button isLoading={updateFormMutation.isPending} type="submit">
            Salvar Formulário
          </Button>
        </footer>
      </form>
    </div>
  )
}
