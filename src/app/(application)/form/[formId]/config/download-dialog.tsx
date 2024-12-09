import { useMutation, useQuery } from '@tanstack/react-query'
import { FileUpIcon } from 'lucide-react'
import { toast } from 'react-toastify'

import { downloadResponses } from '@/api/download-responses'
import { getForm } from '@/api/get-form'
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

interface DownloadDialogProps {
  formId: string | number
}

export function DownloadDialog({ formId }: DownloadDialogProps) {
  const { data: form } = useQuery({
    queryKey: ['form', formId],
    queryFn: () => getForm(formId),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (format: 'csv' | 'excel') =>
      downloadResponses({ formId, format, formName: form.name }),
    onSuccess: () => {
      toast('Download Concluído', {
        type: 'success',
      })
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          Exportar <FileUpIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Download formulario</DialogTitle>
        <DialogDescription>
          Faça download de todos as respostas do seu formulário e use as como
          quiser
        </DialogDescription>
        <DialogFooter className="mt-10">
          <DialogClose asChild>
            <Button
              onClick={() => mutateAsync('csv')}
              isLoading={isPending}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Download CSV
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => mutateAsync('excel')}
              isLoading={isPending}
              className="bg-green-400 hover:bg-green-500"
            >
              Download Excel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
