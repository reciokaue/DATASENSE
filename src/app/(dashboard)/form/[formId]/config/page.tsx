'use client'

import { useQuery } from '@tanstack/react-query'
import { Copy } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { LabelDiv } from '@/src/components/ui/label-div'
import { Switch } from '@/src/components/ui/switch'
import { Textarea } from '@/src/components/ui/textarea'
import { useToast } from '@/src/components/ui/use-toast'
import { api } from '@/src/lib/api'

import { PageFormSlugProps } from '../layout'

export default function ConfigPage({ params }: PageFormSlugProps) {
  const { toast } = useToast()
  const { data: form } = useQuery({
    queryKey: ['form', params.formId],
    queryFn: async () => {
      const response = await api.get(`/forms/${params.formId}`)
      return response.data
    },
  })

  function handleCopyFormLink() {
    const answerFormLink = `http://localhost:3000/answer/${params.formId}`
    navigator.clipboard.writeText(answerFormLink)
    toast({
      title: 'Link copiado com sucesso!',
      variant: 'default',
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      {form && (
        <section>
          <h1 className="text-xl font-semibold leading-relaxed">{form.name}</h1>
          <p>{form.about}</p>
          <footer className="my-4 flex gap-4">
            <Switch title="Ativo" checked={form.active} aria-readonly />
            <Switch title="Publico" checked={form.isPublic} aria-readonly />
          </footer>
          <Button onClick={handleCopyFormLink}>
            Copiar link
            <Copy />
          </Button>
          <header className="flex w-full items-start justify-start gap-2 py-4">
            <div className="flex flex-col space-y-2">
              <Input value={form.name} placeholder="Nome do formulário" />
              <Textarea
                value={form.about}
                className="h-36 w-full resize-none"
                placeholder="descrição"
              />
            </div>
            <div className="flex flex-col">
              <LabelDiv title="Publico">
                <Switch />
              </LabelDiv>
            </div>
          </header>
        </section>
      )}
    </div>
  )
}
