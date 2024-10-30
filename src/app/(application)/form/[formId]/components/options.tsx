import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

import { EmojiPicker } from '@/src/components/emoji-picker'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { cn } from '@/src/lib/utils'
interface OptionsProps {
  formObject: UseFormReturn<any>
  index: number
}

export function Options({ formObject, index }: OptionsProps) {
  const { register, control, setValue, watch } = formObject

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

  const questionType = watch(`questions.${index}.questionType`)

  if (questionType.name === 'text') return

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
        direction={questionType.name === 'emoji' ? 'horizontal' : 'vertical'}
        renderItem={(item, optionIndex) => {
          const textInputName = `questions.${index}.options.${optionIndex}.text`

          setValue(
            `questions.${index}.options.${optionIndex}.index`,
            optionIndex,
          )
          return (
            <SortableItem
              sortableId={item.id}
              className={cn(
                'flex flex-row-reverse items-center gap-2',
                questionType.name === 'emoji' && 'flex-col-reverse',
              )}
            >
              <Button
                onClick={(e) => removeOption(e, item)}
                className="hover:text-red-500"
                size="icon"
                variant="ghost"
              >
                <Trash2 />
              </Button>
              {questionType.name === 'emoji' ? (
                <EmojiPicker name={textInputName} control={control} />
              ) : (
                <Input
                  {...register(textInputName)}
                  placeholder="Texto da opção"
                  styles="flex-1"
                />
              )}
            </SortableItem>
          )
        }}
      />
    </section>
  )
}
