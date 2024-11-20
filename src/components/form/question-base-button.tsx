import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
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

// interface QuestionBaseProps {}

export function QuestionBaseButton() {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const query = ''
  const page = 0
  const pageSize = 10
  const categoryId = null

  const { data: questions } = useQuery({
    queryKey: ['questions-base'],
    queryFn: () => getQuestions({ query, page, pageSize, categoryId }),
  })

  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: getQuestionTypes,
  })
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({
        page: 0,
        pageSize: 100,
      }),
  })

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
          <Input placeholder="Buscar questão" styles="w-full" />
          <Dropdown
            setSelected={() => {}}
            placeholder={'Tipo da questão'}
            options={questionTypes}
            className="w-52"
          />
          <Dropdown
            setSelected={() => {}}
            placeholder={'Categoria'}
            options={categories.categories}
            className="w-52"
          />
        </header>
        <section className="grid grid-cols-4 gap-2">
          {questions &&
            questions?.map((question) => (
              <Card
                key={question.id}
                className="cursor flex h-auto max-w-[250px] gap-2 px-4 py-2 ring-primary hover:ring-2"
                onClick={() => setSelectedQuestion(question)}
              >
                <div className="flex w-full flex-col ">
                  <header className="flex items-center justify-between gap-2">
                    <h2 className="text-start text-base font-medium">
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
        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={() => {}}
            variant="outline"
            className="h-8 w-8 p-0"
            // disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => {}}
            variant="outline"
            className="h-8 w-8 p-0"
            // disabled={currentPage === 0}
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
          <Button disabled={!selectedQuestion}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
