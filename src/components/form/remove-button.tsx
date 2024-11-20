import { format } from 'date-fns'

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
              Voce tem certeza que realmente deseja excluir o formulário{' '}
              {form?.name} com {form?.questions?.length} questões criado em
              {format(new Date(form?.createdAt), ' dd/mm/yyyy')} essa ação sera
              irreversível e todos os dados do formulário serão perdidos,
              questões, respostas etc, realmente deseja excluir este formulário?
            </p>
          ) : (
            <Skeleton className="h-60 w-full" />
          )}
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive">Excluir</Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
