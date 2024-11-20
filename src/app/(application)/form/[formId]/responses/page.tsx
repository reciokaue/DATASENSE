'use client'

import { useQuery } from '@tanstack/react-query'
import { FileUpIcon } from 'lucide-react'
import { useState } from 'react'

import { getFormSummary } from '@/api/get-form-sumary'
import { getQuestionsResults } from '@/api/get-question-results'
import { getSessions } from '@/api/get-sessions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import { ResponseCard } from '../../../../../components/form/response-card'

const summaryTitles = [
  'Total de sessões',
  'Total de respostas',
  'Total de questões',
  'Taxa de conclusão',
  'Média de respostas por sessão',
]

export default function ResponsesPage({
  params,
}: {
  params: { formId: string }
}) {
  const [viewType, setViewType] = useState('cards')
  const { formId } = params

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['formSummary', formId],
    queryFn: () => getFormSummary(formId),
  })
  const { data: questionResults, isLoading: questionLoading } = useQuery({
    queryKey: ['questionsResults', formId],
    queryFn: () => getQuestionsResults(formId),
  })
  const { data: sessions } = useQuery({
    queryKey: ['sessions', formId],
    queryFn: () => getSessions({ formId }),
  })

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col  items-center space-y-6 pb-10">
      <header className="grid w-full grid-cols-2 gap-3 md:grid-cols-5">
        {summaryLoading ? (
          <>
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
          </>
        ) : (
          <>
            {Object.values(summary).map((summaryValue, index) => (
              <Card
                key={summaryTitles[index]}
                className="flex h-full w-full flex-col p-6"
              >
                <span className="text-4xl font-semibold text-primary">
                  {summaryValue}
                </span>
                <p className="text-sm text-secondary-foreground">
                  {summaryTitles[index]}
                </p>
              </Card>
            ))}
          </>
        )}
      </header>
      <nav className="flex w-full items-center justify-start gap-3">
        <DateRangePicker />
        <Select onValueChange={setViewType}>
          <SelectTrigger className="h-full w-fit">
            <SelectValue placeholder="Visualização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cards">Cards</SelectItem>
            <SelectItem value="table">Tabela</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Filtrar" />

        <Button className="ml-auto">
          Exportar <FileUpIcon />
        </Button>
      </nav>
      <div className="grid w-full grid-cols-2 gap-6">
        {questionLoading ? (
          <>
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </>
        ) : viewType === 'cards' ? (
          questionResults?.questions.map((question) => (
            <ResponseCard key={question.id} question={question} />
          ))
        ) : (
          viewType === 'table' && <>{JSON.stringify(sessions)}</>
        )}
      </div>
    </div>
  )
}
