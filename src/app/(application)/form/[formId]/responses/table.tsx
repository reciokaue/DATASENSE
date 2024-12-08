import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { z } from 'zod'

import { getQuestionsResults } from '@/api/get-question-results'
import { getSessions } from '@/api/get-sessions'
import { Pagination } from '@/components/pagination'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
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
    <section className="flex flex-col justify-between gap-4 pb-6">
      <ScrollArea className="w-[1024px] py-2">
        <ScrollBar
          className="absolute top-0"
          orientation="horizontal"
          autoFocus
        />
        <TableBase className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Respondido em</TableHead>
              {questions?.questions?.map((question) => {
                const questionType = question.type
                const width = questionWidths[questionType] || 'min-w-200px'

                return (
                  <TableHead
                    key={question.id}
                    className={cn([``, width])}
                    // style={{ width: 100 }}
                  >
                    {question.text}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isPending &&
              sessions?.sessions?.map((session, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(new Date(session.createdAt), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  {session.responses.map((response, index) => (
                    <TableCell key={response?.id}>
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
        <ScrollBar className="mt-2" orientation="horizontal" autoFocus />
      </ScrollArea>
      <Pagination
        perPage={pageSize}
        pageIndex={page}
        totalCount={sessions?.meta?.totalCount}
      />
    </section>
  )
}

const questionWidths: Record<string, string> = {
  starRating: 'min-w-[120px]',
  list: 'min-w-[180px]',
  text: 'min-w-[220px]',
  phone: 'min-w-[150px]',
  email: 'min-w-[250px]',
  time: 'min-w-[140px]',
  date: 'min-w-[140px]',
  slider: 'min-w-[200px]',
  longText: 'min-w-[360px]',
  options: 'min-w-[250px]',
}
