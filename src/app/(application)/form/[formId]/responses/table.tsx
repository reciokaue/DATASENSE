import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { z } from 'zod'

import { getQuestionsResults } from '@/api/get-question-results'
import { getSessions } from '@/api/get-sessions'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatResponse } from '@/utils/formatResponse'
import { useQueryParams } from '@/utils/useQueryParams'

interface TableProps {
  formId: string | number
}

const pageSize = 15

export function Table({ formId }: TableProps) {
  const { searchParams } = useQueryParams()

  const from = JSON.parse(searchParams.get('from'))
  const to = JSON.parse(searchParams.get('to'))
  const search = searchParams.get('s') || ''
  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: sessions, isPending } = useQuery({
    queryKey: ['sessions', formId, search, page, from, to],
    queryFn: () =>
      getSessions({ formId, query: search, page, pageSize, from, to }),
  })
  const { data: questions } = useQuery({
    queryKey: ['questionsResults', formId],
    queryFn: () => getQuestionsResults({ formId }),
  })

  return (
    <section className="flex h-full w-full flex-col justify-between gap-4">
      <TableBase className="w-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Respondido em</TableHead>
            {questions?.questions?.map((question) => (
              <TableHead className="w-auto" key={question.id}>
                {question.text}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isPending &&
            sessions?.sessions?.map((session, index) => (
              <TableRow key={index}>
                <TableCell className="w-auto">
                  {format(new Date(session.createdAt), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                {session.responses.map((response, index) => (
                  <TableCell key={response?.id} className="w-auto">
                    {formatResponse(
                      String(response?.text || response?.value),
                      questions?.questions[index]?.type,
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {isPending &&
            Array.from({ length: pageSize }).map((_, rowIndex) => (
              <TableRow key={`skeleton-row-${rowIndex}`}>
                {Array.from({
                  length: (questions?.questions.length || 0) + 1,
                }).map((_, cellIndex) => (
                  <TableCell
                    key={`skeleton-cell-${rowIndex}-${cellIndex}`}
                    className="w-auto"
                  >
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </TableBase>
      <Pagination
        perPage={pageSize}
        pageIndex={page}
        totalCount={sessions?.meta?.totalCount}
      />
    </section>
  )
}
