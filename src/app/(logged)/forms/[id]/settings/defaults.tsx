/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { updateForm } from '@/src/api/update-form'
import { Switch } from '@/src/components/ui/switch'
import { FormDTO } from '@/src/DTOs/form'

interface DefaultsProps {
  form: FormDTO | undefined
}

export function Defaults({ form }: DefaultsProps) {
  const [active, setActive] = useState(form?.active)
  const [isPublic, setIsPublic] = useState(form?.isPublic)
  const queryClient = useQueryClient()

  const updateFormMutation = useMutation({
    mutationFn: (form: any) => updateForm(form),
    onError: (err, updatingForm) => {
      console.log(updatingForm, err)
    },
  })

  async function onChangeDefaults() {
    const newForm = { id: form?.id, active, isPublic }
    await updateFormMutation.mutateAsync(newForm)
    queryClient.setQueryData(['form', String(form?.id)], {
      ...form,
      ...newForm,
    })
  }

  useEffect(() => {
    onChangeDefaults()
  }, [active, isPublic])

  return (
    <>
      <div className="relative">
        <label className="text-lg font-normal">Ativo</label>
        <p className="w-4/5 text-sm font-light leading-relaxed">
          Define se o formulário esta ativo e pode receber novas respostas,
          formulários inativos não podem receber novas respostas.
        </p>
        <Switch
          checked={active}
          onCheckedChange={setActive}
          className="absolute right-5 top-1/2"
        />
      </div>
      <div className="relative ">
        <label className="text-lg font-normal">Publico</label>
        <p className="w-4/5 text-sm font-light leading-relaxed">
          Define se o formulário pode ser acessado na aba de comunidade por
          outros usuários, essa ação ajuda outros usuários com a criação de seus
          formulários e não compartilha nenhum dado sensível ou respostas de seu
          formulário.
        </p>
        <Switch
          checked={isPublic}
          onCheckedChange={setIsPublic}
          className="absolute right-5 top-1/2"
        />
      </div>
    </>
  )
}
