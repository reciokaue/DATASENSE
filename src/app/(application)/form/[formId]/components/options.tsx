/* eslint-disable react-hooks/rules-of-hooks */
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

import { InputEmojiPicker } from '@/src/components/emoji-picker'
import { SortableItem } from '@/src/components/sortable/sortable-item'
import { SortableList } from '@/src/components/sortable/sortable-list'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
interface OptionsProps {
  formObject: UseFormReturn<any>
  index: number
}

const types = {
  STAR_RATING: 'starRating',
  LIST: 'list',
  TEXT: 'text',
  PHONE: 'phone',
  EMAIL: 'email',
  TIME: 'time',
  DATE: 'date',
  SLIDER: 'slider',
  LONG_TEXT: 'longText',
  OPTIONS: 'options', // Adicionado para o seu caso
}

export function Options({ formObject, index }: OptionsProps) {
  const { control, setValue, watch } = formObject
  const questionType = watch(`questions.${index}.questionType`)

  if (![types.OPTIONS, types.LIST].includes(questionType.name)) return

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: `questions.${index}.options`,
    keyName: 'fieldId',
  })
  function newOption() {
    if (fields.length < 7) {
      append({
        id: -Math.round(Math.random() * 1000),
        text: '',
        index: fields.length,
      })
    }
  }
  function deleteOption(option: any) {
    remove(option.index)
  }

  if (questionType.name === types.OPTIONS || questionType.name === types.LIST)
    return (
      <section className="space-y-3">
        <Header onPress={newOption} />
        <SortableList
          items={fields}
          swap={swap}
          direction={questionType.name === 'emoji' ? 'horizontal' : 'vertical'}
          renderItem={(item, optionIndex) => {
            const textInputName = `questions.${index}.options.${optionIndex}.text`
            const formObject = `questions.${index}.options.${optionIndex}.index`
            setValue(formObject, optionIndex)

            return (
              <SortableItem
                sortableId={item.id}
                className={cn(
                  'flex flex-row-reverse items-center gap-2',
                  questionType.name === 'emoji' && 'flex-col-reverse',
                )}
              >
                <Button
                  onClick={() => deleteOption(item)}
                  className="hover:text-red-500"
                  size="icon"
                  variant="ghost"
                  type="button"
                >
                  <Trash2 />
                </Button>
                <InputEmojiPicker name={textInputName} control={control} />
              </SortableItem>
            )
          }}
        />
      </section>
    )
}

function Header({ onPress }: { onPress: () => void }) {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-sm font-medium">Opções </h2>
      <div className="flex items-center gap-2">
        <Button type="button" onClick={onPress} size="sm" variant="ghost">
          <Plus size={20} />
        </Button>
      </div>
    </header>
  )
}
