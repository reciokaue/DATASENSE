import { useQuery } from '@tanstack/react-query'
import { FolderSearch, LayoutGrid } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

import { getQuestions } from '@/api/get-questions'
import { Question } from '@/models'
import { useQueryParams } from '@/utils/useQueryParams'

import { Pagination } from '../../pagination'
import { Button } from '../../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { Skeleton } from '../../ui/skeleton'
import { Card } from './card'
import { Filters } from './filters'
import { Footer } from './footer'

interface QuestionBaseProps {
  actions: any
}

const pageSize = 8

export function QuestionBaseButton({ actions }: QuestionBaseProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  )
  const { searchParams } = useQueryParams()

  const search = searchParams.get('s') || ''
  const categoryId = searchParams.get('catId')
  const questionTypeId = searchParams.get('typeId')
  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isPending } = useQuery({
    queryKey: [
      'questions-base',
      search,
      page,
      pageSize,
      categoryId,
      questionTypeId,
    ],
    queryFn: () =>
      getQuestions({
        query: search,
        page,
        pageSize,
        categoryId,
        questionTypeId,
      }),
  })

  const addQuestion = () => {
    actions.addQuestion({ question: selectedQuestion })
    setSelectedQuestion(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-between">
          Banco de Questões <LayoutGrid />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg">
        <Filters />
        <section className="min-h-80 w-full">
          <div className="grid h-full grid-cols-4 grid-rows-2 gap-4">
            {!isPending &&
              result.meta.totalCount > 0 &&
              result?.questions?.map((question) => (
                <Card
                  question={question}
                  key={question.id}
                  aria-selected={selectedQuestion?.id === question.id}
                  onClick={() => setSelectedQuestion(question)}
                />
              ))}

            {isPending &&
              [0, 1, 2, 3].map((index) => (
                <Skeleton key={index} className="h-full w-full" />
              ))}
          </div>
          {result?.questions?.length === 0 && (
            <div className="-mt-52 flex flex-col items-center justify-center gap-2 text-primary/50">
              <FolderSearch className="size-10" />
              Nenhuma questão encontrada
            </div>
          )}
        </section>
        <Pagination
          pageIndex={page}
          perPage={pageSize}
          totalCount={result?.meta.totalCount}
        />
        <Footer selectedQuestion={selectedQuestion} addQuestion={addQuestion} />
      </DialogContent>
    </Dialog>
  )
}
