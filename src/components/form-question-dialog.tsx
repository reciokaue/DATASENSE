'use client'

import { useQuery } from '@tanstack/react-query'
import { AlignJustify } from 'lucide-react'
import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { ScrollArea } from '@/src/components/ui/scroll-area'

import { getForm } from '../api/get-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Skeleton } from './ui/skeleton'

interface FormQuestionsDialogProps {
  formId: number
}

export function FormQuestionsDialog({ formId }: FormQuestionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { data: form, isLoading } = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      const data = await getForm(formId)
      return data
    },
    enabled: isOpen,
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute bottom-2 right-2 z-10">
          <AlignJustify className="size-4 " />
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Perguntas do Formulário</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex flex-col items-center">
              <Skeleton className="mb-4 h-8 w-3/4" />
              <Skeleton className="mb-4 h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <ScrollArea className="h-80">
              {form?.questions ? (
                form.questions.map((question) => (
                  <Card key={question.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{question.text}</CardTitle>
                      <CardDescription>
                        Tipo: {question.questionType.label} | Respostas:{' '}
                        {question._count.responses}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {question.options.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {question.options.map((option) => (
                            <li key={option.id}>
                              {option.index + 1}. {option.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Essa pergunta não possui opções.</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>Nenhuma pergunta encontrada.</p>
              )}
            </ScrollArea>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}
