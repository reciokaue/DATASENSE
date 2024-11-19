import { useQuery } from '@tanstack/react-query'
import { FileUpIcon } from 'lucide-react'

import { getFormSummary } from '@/api/get-form-sumary'
import { getQuestionsResults } from '@/api/get-question-results'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

import { ResponseCard } from '../components/response-card'

interface ResponsesProps {
  formId: number | string
}

const summaryTitles = [
  'Total de questões',
  'Total de sessões',
  'Total de respostas',
  'Taxa de conclusão',
  'Média de respostas por sessão',
]

export function Responses({ formId }: ResponsesProps) {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['formSummary', formId],
    queryFn: () => getFormSummary(formId),
  })
  const { data: questionResults, isLoading: questionLoading } = useQuery({
    queryKey: ['questionsResults', formId],
    queryFn: () => getQuestionsResults(formId),
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
        <Input placeholder="Filtrar" />
        <Button className="ml-auto">
          Exportar <FileUpIcon />
        </Button>
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione os gráficos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pizza">Pizza</SelectItem>
            <SelectItem value="waffle">Waffle</SelectItem>
          </SelectContent>
        </Select> */}
      </nav>
      <div className="grid w-full grid-cols-2 gap-6">
        {questionLoading ? (
          <>
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </>
        ) : (
          questionResults?.questions.map((question) => (
            <ResponseCard key={question.id} question={question} />
          ))
        )}
      </div>
    </div>
  )
}
