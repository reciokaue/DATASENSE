import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { getQuestionsResults } from '@/api/get-question-results'
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryParams } from '@/utils/useQueryParams'

import { ResponseCard } from './response-card'

interface CardsProps {
  formId: string | number
}

export function Cards({ formId }: CardsProps) {
  const { searchParams } = useQueryParams()

  const from = JSON.parse(searchParams.get('from'))
  const to = JSON.parse(searchParams.get('to'))
  const search = searchParams.get('s') || ''

  const { data: result, isLoading: questionLoading } = useQuery({
    queryKey: ['questionsResults', formId, search, from + '-' + to],
    queryFn: () => getQuestionsResults({ formId, query: search, from, to }),
  })

  return (
    <div className="grid w-full grid-cols-2 gap-6 pb-10">
      {!questionLoading &&
        result?.questions.map((question) => (
          <ResponseCard key={question.id} question={question} />
        ))}

      {questionLoading &&
        [0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
    </div>
  )
}
