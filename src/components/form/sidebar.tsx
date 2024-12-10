import { useMutation } from '@tanstack/react-query'
import { Plus, Save } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { updateQuestions } from '@/api/update-questions'
import { cn } from '@/lib/utils'

import { SortableItem } from '../sortable/sortable-item'
import { SortableList } from '../sortable/sortable-list'
import { Button } from '../ui/button'
import { QuestionBaseButton } from './question-base-button'

interface SidebarProps {
  actions: any
  swap: (activeIndex: number, overIndex: number) => void
  formObject: any
  fields: any
}

export function FormSidebar({
  fields,
  swap,
  formObject,
  actions,
}: SidebarProps) {
  const {
    reset,
    watch,
    formState: { isDirty },
  } = formObject

  const { mutateAsync: saveForm, isPending: savingForm } = useMutation({
    mutationFn: async () => {
      const { id, questions } = formObject.getValues()
      await updateQuestions(id, questions)
      console.log(questions)
    },
    onSuccess: () => {
      reset(watch(), {
        keepValues: false,
        keepDirty: false,
        keepDefaultValues: false,
      })

      toast('Formulário salvo com sucesso', { type: 'success' })
    },
  })

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        saveForm()
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [saveForm])

  return (
    <aside className="sticky top-10 flex w-full max-w-xs flex-1 flex-col space-y-3 rounded-lg bg-primary-foreground p-4">
      <Button onClick={actions.addQuestion} className="justify-between">
        Nova questão <Plus />
      </Button>
      <QuestionBaseButton actions={actions} />
      <Button
        onClick={() => saveForm()}
        variant="outline"
        className={cn([
          'justify-between bg-card',
          isDirty && 'border-2 border-blue-500',
        ])}
        isLoading={savingForm}
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
        <Button
          variant="foreground"
          className="w-full"
          link="http://localhost:3000/blog/tipos-questoes-formulario"
        >
          Como medir a satisfação
        </Button>
        <Button
          link="http://localhost:3000/blog/formularios-digitais"
          className="w-full"
          variant="foreground"
        >
          Quais perguntas devo fazer?
        </Button>
        <Button
          className="w-full"
          variant="foreground"
          link="http://localhost:3000/community?form=datasense"
        >
          Modelos Oficiais
        </Button>
      </div>
    </aside>
  )
}
