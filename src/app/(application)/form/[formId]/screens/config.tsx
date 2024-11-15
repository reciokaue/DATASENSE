/* eslint-disable react-hooks/rules-of-hooks */
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { SubmitHandler } from 'react-hook-form'

import { CategorySelector } from '@/components/category-selector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Form } from '@/models'

interface ConfigProps {
  form: UseQueryResult<Form | undefined, Error>
  formObject: any
  updateForm: UseMutationResult<AxiosResponse<any, any>, Error, any, unknown>
}

export function Config({ form, formObject, updateForm }: ConfigProps) {
  if (!form) return

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = formObject

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const newForm = await updateForm.mutateAsync(data)
    console.log(newForm)
  }

  const category = watch('category')

  function resetForm() {
    reset(form.data)
  }

  return (
    <div className="mx-auto flex  max-w-3xl flex-col">
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
          <Button
            onClick={resetForm}
            variant="outline"
            link={`/answer/${form?.data?.id}`}
          >
            Link
          </Button>
          <Button
            onClick={resetForm}
            variant="outline"
            disabled={updateForm.isPending}
          >
            Cancelar
          </Button>
          <Button isLoading={updateForm.isPending} type="submit">
            Salvar Formulário
          </Button>
        </footer>
      </form>
    </div>
  )
}
