import { useMutation } from '@tanstack/react-query'

import { DeleteProfile } from '@/api/delete-profile'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/contexts/useAuth'

export function DeleteAccountDialog() {
  const { user, logout } = useAuth()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => DeleteProfile({ userId: user.id }),
    onSuccess: () => logout(),
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir conta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Excluir conta</DialogTitle>
        <DialogDescription>
          Essa ação é irreversível e todos os seus dados serão perdidos
          (formulários, questões, respostas, etc)
        </DialogDescription>
        <DialogFooter className="mt-10">
          <DialogClose disabled={isPending} asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => mutateAsync()}
            variant="destructive"
            isLoading={isPending}
          >
            Excluir conta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
