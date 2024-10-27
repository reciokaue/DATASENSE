import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { FormDTO } from '@/src/DTOs/form'
import {
  questionSchemaArray,
  questionSchemaArrayType,
} from '@/src/utils/schemas/question'

import { Card } from '../editing/card'

interface QuestionsProps {
  form: FormDTO
}

export function Questions({ form }: QuestionsProps) {
  const questionsForm = useForm<questionSchemaArrayType>({
    resolver: zodResolver(questionSchemaArray),
    defaultValues: { questions: form?.questions || [] },
  })
  const { reset, control } = questionsForm

  const { fields, append, swap } = useFieldArray({
    control,
    name: 'questions',
  })

  function handleAddQuestion() {
    append({
      text: '',
      questionType: {
        id: 1,
        name: 'options',
        label: 'Opções',
        icon: 'CircleDot',
      },
      required: false,
      options: [],
      index: fields.length,
      formId: form.id,
      id: -Math.round(Math.random() * 100),
    })
  }

  return (
    <div className="relative flex flex-col pb-10">
      <header className="mb-6 mr-8 flex items-center justify-between ">
        <div className="flex items-center gap-2"></div>
        <Button
          onClick={handleAddQuestion}
          variant="ghost"
          className="items-center"
        >
          Nova questão <Plus />
        </Button>
      </header>

      <SortableList
        items={fields}
        swap={swap}
        renderItem={(item, index) => (
          <SortableItem
            sortableId={item.id}
            className="flex items-center gap-2"
          >
            <Card
              question={item}
              formId={+form.id}
              questionsForm={questionsForm}
              index={index}
            />
          </SortableItem>
        )}
      />
    </div>
  )
}
