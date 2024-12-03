import { useQuery } from '@tanstack/react-query'
import {
  ChevronLeft,
  ChevronRight,
  FolderSearch,
  LayoutGrid,
} from 'lucide-react'
import { useState } from 'react'

import { getCategories } from '@/api/get-categories'
import { getQuestionTypes } from '@/api/get-question-types'
import { getQuestions } from '@/api/get-questions'

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Icon } from '../ui/icon'
import { Input } from '../ui/input'
import { Dropdown } from '../ui/select'
import { Skeleton } from '../ui/skeleton'

interface QuestionBaseProps {
  actions: any
}

export function QuestionBaseButton({ actions }: QuestionBaseProps) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questionTypeId, setQuestionTypeId] = useState<number | null>()
  const [categoryId, setCategoryId] = useState<number | null>()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const pageSize = 8

  const { data: result, isPending } = useQuery({
    queryKey: [
      'questions-base',
      query,
      page,
      pageSize,
      categoryId,
      questionTypeId,
    ],
    queryFn: () =>
      getQuestions({ query, page, pageSize, categoryId, questionTypeId }),
  })
  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: async () => {
      const response = await getQuestionTypes()
      return [{ id: null, label: 'Todas' }, ...response]
    },
  })
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories({ page: 0, pageSize: 100 })
      return [{ id: null, label: 'Todas' }, ...response?.categories]
    },
  })

  const selectQuestionType = (questionType) => {
    setQuestionTypeId(questionType.id)
    setPage(0)
  }

  const selectCategory = (category) => {
    setCategoryId(category.id)
    setPage(0)
  }

  const handleAddQuestion = () => {
    actions.addQuestion({ question: selectedQuestion })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-between">
          Banco de Questões <LayoutGrid />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Banco de Questões</DialogTitle>
        </DialogHeader>
        <header className="flex gap-3">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Buscar questão"
            styles="w-full"
          />
          <Dropdown
            setSelected={selectQuestionType}
            placeholder={'Tipo da questão'}
            options={questionTypes}
            listTitle="Tipo da questão"
            className="w-52"
          />
          <Dropdown
            setSelected={selectCategory}
            placeholder={'Categoria'}
            options={categories}
            listTitle="Categoria da questão"
            className="w-52"
          />
        </header>
        {result && (
          <section className="grid grid-cols-4 gap-2">
            {result?.questions?.map((question) => (
              <Card
                key={question.id}
                aria-selected={selectedQuestion?.id === question.id}
                className="cursor flex h-auto max-w-[250px] gap-2 px-4 py-2 ring-primary hover:ring-2 aria-selected:ring-2"
                onClick={() => setSelectedQuestion(question)}
              >
                <div className="flex w-full flex-col ">
                  <header className="flex items-center justify-between gap-2">
                    <h2 className="text-wrap text-start text-base font-medium">
                      {question.text}
                    </h2>
                  </header>
                  <div className="flex h-fit flex-wrap justify-start gap-1 pt-2">
                    {question?.options?.map((option: any) => (
                      <p key={option.id}>- {option.text}</p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </section>
        )}
        {isPending && (
          <section className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </section>
        )}
        {result?.questions?.length === 0 && (
          <div className="flex h-40 w-full flex-col items-center justify-center gap-2 text-primary/50">
            <FolderSearch className="size-10" />
            Nenhuma questão encontrada
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <span>
            Pagina {page + 1} de{' '}
            {Math.floor(result?.meta.totalCount / pageSize)}
          </span>
          <Button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            disabled={page + 1 >= result?.meta.totalCount / pageSize}
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
        </div>
        {selectedQuestion && (
          <footer className="grid min-h-40 grid-cols-2 gap-3">
            <header className="flex flex-col space-y-2">
              <span className="text-primary/60">Questão selecionada</span>
              <h2 className="text-2xl">{selectedQuestion.text}</h2>
              <div className="flex items-end gap-2">
                <Icon name={selectedQuestion.questionType?.icon} />
                {selectedQuestion.questionType?.label}
              </div>
            </header>
            <div className="flex h-fit flex-wrap justify-start gap-2 pt-6">
              {selectedQuestion?.options?.map((option: any) => (
                <Button key={option.id} type="button" variant="outline">
                  {option.text}
                </Button>
              ))}
            </div>
          </footer>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setSelectedQuestion(null)}
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAddQuestion} disabled={!selectedQuestion}>
              Adicionar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
