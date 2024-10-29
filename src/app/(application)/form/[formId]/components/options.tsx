import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

interface OptionsProps {
  formObject: UseFormReturn<any>
  index: number
}

export function Options({ formObject, index }: OptionsProps) {
  const { register, control, setValue } = formObject

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: `questions.${index}.options`,
    keyName: 'fieldId',
  })

  function newOption(event: any) {
    event.preventDefault()

    if (fields.length < 7) {
      append({
        id: -Math.round(Math.random() * 1000),
        text: '',
        index: fields.length,
      })
    }
  }
  function removeOption(event: any, option: any) {
    event.preventDefault()
    remove(option.index)
  }

  return (
    <section className="space-y-3">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Opções </h2>
        <div className="flex items-center gap-2">
          <Button onClick={newOption} size="sm" variant="ghost">
            <Plus size={20} />
          </Button>
        </div>
      </header>

      <SortableList
        items={fields}
        swap={swap}
        renderItem={(item, optionIndex) => {
          setValue(
            `questions.${index}.options.${optionIndex}.index`,
            optionIndex,
          )
          return (
            <SortableItem
              sortableId={item.id}
              className="flex flex-row-reverse items-center gap-2"
            >
              <Button
                onClick={(e) => removeOption(e, item)}
                className="hover:text-red-500"
                size="icon"
                variant="ghost"
              >
                <Trash2 />
              </Button>
              <Input
                {...register(`questions.${index}.options.${optionIndex}.text`)}
                placeholder="Texto da opção"
                styles="flex-1"
              />
            </SortableItem>
          )
        }}
      />
    </section>
  )
}
