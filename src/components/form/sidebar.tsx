import { Plus, Save } from 'lucide-react'

import { SortableItem } from '../sortable/sortable-item'
import { SortableList } from '../sortable/sortable-list'
import { Button } from '../ui/button'
import { QuestionBaseButton } from './question-base-button'

interface SidebarProps {
  addQuestion: () => void
  swap: (activeIndex: number, overIndex: number) => void
  loading: boolean
}

export function FormSidebar({
  addQuestion,
  save,
  fields,
  swap,
  loading,
}: SidebarProps) {
  return (
    <aside className="sticky top-10 flex w-full max-w-xs flex-1 flex-col space-y-3 rounded-lg bg-primary-foreground p-4">
      <Button onClick={addQuestion} className="justify-between">
        Nova questão <Plus />
      </Button>
      <QuestionBaseButton />
      <Button
        onClick={save}
        variant="outline"
        className="justify-between bg-card"
        isLoading={loading}
      >
        Salvar <Save />
      </Button>

      <div className="flex flex-col space-y-4 pt-4">
        <h2 className="text-sm font-medium">Ordem das questões</h2>
        {fields && (
          <SortableList
            items={fields}
            swap={swap}
            renderItem={(item, index) => (
              <SortableItem sortableId={item.id} className="flex w-full px-2">
                <a
                  href={`#question-${index}`}
                  className="flex w-11/12 items-center gap-2"
                >
                  <h3 className="font-semibold">{index + 1}</h3>
                  <p className="w-full truncate text-sm">
                    {fields[index]?.text}
                  </p>
                </a>
              </SortableItem>
            )}
          />
        )}
      </div>

      <div className="flex flex-col space-y-4 pt-4">
        <h2 className="text-sm font-medium">Dicas de leitura</h2>
        <Button variant="foreground">Como medir a satisfação</Button>
        <Button variant="foreground">Quais perguntas devo fazer?</Button>
        <Button variant="foreground">Modelos Oficiais</Button>
      </div>
    </aside>
  )
}
