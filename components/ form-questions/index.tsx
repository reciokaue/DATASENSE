'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormSchema } from '@/utils/schemas/form'

type Props = z.infer<typeof FormSchema>

// TODO Componentizar cada parte do form e faze-las receber uma propriedade "form" que
// vai acopla-la no form independente da camada que se encontra

export function FormQuestions() {
  const form = useForm<Props>({
    resolver: zodResolver(FormSchema),
  })

  const { handleSubmit } = form

  async function handleEditForm(data: Props) {
    console.log(data)
  }

  return <form onSubmit={handleSubmit(handleEditForm)}></form>
}
