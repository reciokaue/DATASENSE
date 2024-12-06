import { useQuery } from '@tanstack/react-query'

import { getFormSummary } from '@/api/get-form-sumary'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface SummaryProps {
  formId: string | number
}

const summaryTitles = [
  'Total de sessões',
  'Total de respostas',
  'Total de questões',
  'Média de respostas por sessão',
  'Taxa de conclusão',
]

export function Summary({ formId }: SummaryProps) {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['formSummary', formId],
    queryFn: () => getFormSummary(formId),
  })

  return (
    <header className="grid w-full grid-cols-2 gap-3 md:grid-cols-5">
      {!summaryLoading &&
        Object.values(summary).map((summaryValue, index) => (
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

      {summaryLoading &&
        [0, 1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-36 w-full" />
        ))}
    </header>
  )
}
