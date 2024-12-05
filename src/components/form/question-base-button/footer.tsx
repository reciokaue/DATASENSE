import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Icon } from '@/components/ui/icon'
import { Question } from '@/models'

interface FooterProps {
  selectedQuestion: Question
  addQuestion: () => any
}

export function Footer({ selectedQuestion, addQuestion }: FooterProps) {
  return (
    <>
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
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={addQuestion} disabled={!selectedQuestion}>
            Adicionar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}
