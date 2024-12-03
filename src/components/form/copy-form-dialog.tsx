import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { createNewForm } from '@/api/create-new-form'
import { GetFormsData } from '@/api/get-forms'
import { Form } from '@/models'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface CopyFormDialogProps {
  formTemplate: Form
}

export function CopyFormDialog({ formTemplate }: CopyFormDialogProps) {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return await createNewForm(
        {
          name: formTemplate.name + ' Copiado',
          description: formTemplate.name,
          category: formTemplate.category,
        },
        formTemplate.id,
      )
    },
    onSuccess: (newForm: Form) => {
      const previous: GetFormsData = queryClient.getQueryData(['user-forms'])

      if (previous)
        queryClient.setQueryData(['user-forms'], {
          meta: {
            ...previous?.meta,
            totalCount: previous?.meta?.totalCount + 1,
          },
          forms: [...previous.forms, newForm],
        })

      queryClient.setQueryData(['form', newForm.id], newForm)

      push(`/form/${newForm.id}`)
      toast('Formulário copiado com sucesso', { type: 'info' })
    },
    onError(error) {
      console.log(error)
      toast('Erro ao copiar o formulário', { type: 'error' })
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Copiar <Plus size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex min-w-[400px] flex-col">
        <DialogTitle>Copiar formulário</DialogTitle>
        <DialogDescription>
          Essa ação irá copiar apenas as informações básicas do formulário. As
          respostas não serão incluídas na cópia.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => mutateAsync()}
            isLoading={isPending}
            type="submit"
          >
            Copiar Formulário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
