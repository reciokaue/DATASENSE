import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

import { deleteForm } from '@/api/delete-form'
import { GetFormsData } from '@/api/get-forms'
import { Form } from '@/models'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'

interface RemoveButtonProps {
  form?: Form
}

export function RemoveButton({ form }: RemoveButtonProps) {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteForm(form.id),
    onSuccess: () => {
      const previous: GetFormsData = queryClient.getQueryData(['user-forms'])

      queryClient.setQueryData(['user-forms'], {
        meta: {
          ...previous.meta,
          totalCount: previous.meta.totalCount - 1,
        },
        forms: previous.forms.filter((f) => f.id !== form.id),
      })
      push('/home')
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Formulário</DialogTitle>
          {form ? (
            <p>
              Essa ação sera irreversível e todos os dados do formulário serão
              perdidos, questões, respostas etc, realmente deseja excluir este
              formulário?
            </p>
          ) : (
            <Skeleton className="h-60 w-full" />
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => mutateAsync()}
            className="w-24"
            variant="destructive"
            isLoading={isPending}
          >
            Excluir
          </Button>
          <DialogClose asChild>
            <Button disabled={isPending} variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
